import { Chunk } from './types'
import { promisify } from 'util'

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
    const asyncMethod = promisify(method)
    return asyncMethod(eventName, { fromBlock, toBlock })
  })
  return promises
}
