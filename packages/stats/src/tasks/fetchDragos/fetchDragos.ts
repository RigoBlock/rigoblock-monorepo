import Web3 = require('web3')
import { EventLog } from '../../types'
import { getBlockChunks } from '../../utils'
import fetchContracts from '@rigoblock/contracts'
import redis from '../../redis'
import web3ErrorWrapper from '../web3ErrorWrapper'

const task = async (job, web3: Web3) => {
  const { network } = job.data
  const contractsMap = await fetchContracts(network)
  const { abi, address } = contractsMap.DragoEventful
  const dragoEventful = new web3.eth.Contract(abi, address)
  const chunkSize = 100000
  const chunks = await getBlockChunks(0, 'latest', chunkSize, web3)
  const eventsPromises = chunks.map(([fromBlock, toBlock]) => {
    const eventPromise: Promise<EventLog[]> = new Promise((resolve, reject) =>
      dragoEventful.getPastEvents(
        'DragoCreated',
        {
          fromBlock,
          toBlock
        },
        (errors, events) => (errors ? reject(errors) : resolve(events))
      )
    )
    return eventPromise
  })
  const fetchResult = await Promise.all(eventsPromises)
  const dragoEvents = fetchResult
    .filter(arr => arr.length)
    .reduce((acc, curr) => [...acc, ...curr], [])
  const dragos = dragoEvents.map(dragoEvent => {
    const { drago, dragoId } = dragoEvent.returnValues
    return redis.hset(`dragos:${network}`, drago, dragoId)
  })

  return Promise.all(dragos)
}

export default web3ErrorWrapper(task)
