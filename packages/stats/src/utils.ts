import { BigNumber } from 'bignumber.js'
import { Chunk } from './types'
import { promisify } from 'util'
import fetch from 'node-fetch'

const getBlockChunks = (start, end, chunkSize = 100000): Chunk[] => {
  const startBlock = start
  const chunks = []
  let endBlock = end
  for (let i = startBlock - 1; i < endBlock; i += chunkSize) {
    const fromBlock = i + 1
    const toBlock = i + chunkSize > end ? end : i + chunkSize
    chunks.push([fromBlock, toBlock])
  }
  return chunks
}

export const chunkifyEvents = async (method, eventName, web3) => {
  const lastBlock = await web3.eth.getBlockNumber()
  const chunks = getBlockChunks(0, lastBlock)
  const promises = chunks.map(([fromBlock, toBlock]) => {
    const asyncMethod = promisify(method)
    return asyncMethod(eventName, { fromBlock, toBlock })
  })
  return promises
}

export const postJSON = (url, body = {}) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json())

export const toUnitAmount = (amount, decimals) => {
  const exp = new BigNumber(10).pow(decimals)
  return new BigNumber(amount).div(exp)
}

export const toBn = v => new BigNumber(v)
