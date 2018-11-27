import { Chunk, EventLog } from './types'

const getBlockChunks = async (
  start,
  end,
  chunkSize,
  web3
): Promise<Chunk[]> => {
  const startBlock = start
  const chunks = []
  let endBlock = end
  if (endBlock === 'latest') {
    endBlock = await web3.eth.getBlockNumber()
  }
  for (let i = startBlock - 1; i < endBlock; i += chunkSize) {
    const fromBlock = i + 1
    const toBlock = i + chunkSize > endBlock ? end : i + chunkSize
    chunks.push([fromBlock, toBlock])
  }
  return chunks
}

export const chunkifyEvents = async (method, eventName, web3) => {
  const chunkSize = 100000
  const chunks = await getBlockChunks(0, 'latest', chunkSize, web3)
  const promises = chunks.map(([fromBlock, toBlock]) => {
    const eventPromise: Promise<EventLog[]> = new Promise((resolve, reject) => {
      method.apply(
        this,
        [eventName, { fromBlock, toBlock }],
        (errors, events) => (errors ? reject(errors) : resolve(events))
      )
    })
    return eventPromise
  })
  return promises
}
