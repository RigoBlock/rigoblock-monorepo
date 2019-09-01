import Web3 = require('web3')
import { EventLog } from '../../types'
import { chunkifyEvents } from '../../utils'
import fetchContracts from '@rgbk/contracts'
import redis from '../../redis'
import web3ErrorWrapper from '../web3ErrorWrapper'

const task = async (job, web3: Web3) => {
  const { network } = job.data
  const contractsMap = await fetchContracts(network)
  const { abi, address } = contractsMap.DragoEventful
  const dragoEventful = new web3.eth.Contract(abi, address)
  const eventsPromises = await chunkifyEvents(
    dragoEventful.getPastEvents.bind(dragoEventful),
    'DragoCreated',
    web3
  )
  const fetchResult: Array<EventLog[]> = await Promise.all(eventsPromises)
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
