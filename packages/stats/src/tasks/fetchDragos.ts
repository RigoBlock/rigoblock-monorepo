import { Job } from 'bull'
import protocol from '@rigoblock/protocol'
import redis from '../redis'
import web3 from '../web3'

const dragoEventfulAddress = '0x35d3ab6b7917d03050423f7e43d4d9cff155a685'

type Event = {
  returnValues: {
    drago: string
    dragoId?: string
  }
}

const task = async (job: Job) => {
  const { network } = job.data
  const contractsMap = await protocol(network)
  const dragoEventfulAbi = contractsMap.DragoEventful.abi
  const dragoEventful = new web3.eth.Contract(
    dragoEventfulAbi,
    dragoEventfulAddress
  )
  const dragoEventsPromise = await new Promise<Event[]>((resolve, reject) =>
    dragoEventful.getPastEvents(
      'DragoCreated',
      { fromBlock: 0, toBlock: 'latest' },
      (errors, events) => (errors ? reject(errors) : resolve(events))
    )
  )

  const dragos = dragoEventsPromise.map(dragoEvent => {
    const { drago, dragoId } = dragoEvent.returnValues
    return redis.hset('dragos', drago, dragoId)
  })

  return Promise.all(dragos)
}

export default task
