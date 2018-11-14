import { BlockType } from './types'

export const getBlockChunks = async (
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

type Chunk = [BlockType, BlockType]
