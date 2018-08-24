import * as Web3 from 'web3'
import { CONTRACT_ADDRESSES, NETWORKS } from '../constants'
import { Job } from 'bull'
import protocol from '@rigoblock/protocol'
import redis from '../redis'

const anyWeb3: any = Web3

type Event = {
  returnValues: {
    drago: string
    dragoId?: string
  }
}

const task = async (job: Job) => {
  const { network, web3Provider } = job.data
  const web3 = new anyWeb3(
    new anyWeb3.providers.WebsocketProvider(web3Provider)
  )

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

export default task
