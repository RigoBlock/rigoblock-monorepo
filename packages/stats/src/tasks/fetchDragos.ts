import * as DragoEventful from '../../../protocol/artifacts/DragoEventful.json'
import redis from '../redis'
import web3 from '../web3'

const dragoEventfulAddress = '0x35d3ab6b7917d03050423f7e43d4d9cff155a685'

const task = async () => {
  const dragoEventfulAbi = DragoEventful.networks['42'].abi
  const dragoEventful = new web3.eth.Contract(
    dragoEventfulAbi,
    dragoEventfulAddress
  )
  const dragoEventsPromise: any = await new Promise((resolve, reject) =>
    dragoEventful.getPastEvents(
      'DragoCreated',
      { fromBlock: 0, toBlock: 'latest' },
      (errors, events) => (errors ? reject(errors) : resolve(events))
    )
  ).catch(e => console.error(e))

  const dragos = dragoEventsPromise.map(dragoEvent => {
    const { drago, dragoId } = dragoEvent.returnValues
    return redis.hset('dragos', drago, dragoId)
  })

  return Promise.all(dragos)
}

export default task
