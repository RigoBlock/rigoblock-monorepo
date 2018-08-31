import Web3 = require('web3')
import { CONTRACT_ADDRESSES, NETWORKS } from '../constants'
import protocol from '@rigoblock/protocol'
import redis from '../redis'
import web3ErrorWrapper from './web3ErrorWrapper'

type Event = {
  returnValues: {
    drago: string
    dragoId?: string
  }
}

const task = async (job, web3: Web3) => {
  const { network } = job.data
  const contractsMap = await protocol(NETWORKS.KOVAN)
  const dragoEventfulAbi = contractsMap.DragoEventful.abi
  const dragoEventful = new web3.eth.Contract(
    dragoEventfulAbi,
    CONTRACT_ADDRESSES[network].DragoEventful
  )
  const dragoEvents = await new Promise<Event[]>((resolve, reject) =>
    dragoEventful.getPastEvents(
      'DragoCreated',
      { fromBlock: 0, toBlock: 'latest' },
      (errors, events) => (errors ? reject(errors) : resolve(events))
    )
  )
  const dragos = dragoEvents.map(dragoEvent => {
    const { drago, dragoId } = dragoEvent.returnValues
    return redis.hset(`dragos:${network}`, drago, dragoId)
  })

  return Promise.all(dragos)
}

export default web3ErrorWrapper(task)
