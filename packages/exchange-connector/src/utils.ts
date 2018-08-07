import * as Web3 from 'web3'
// import * as tokens from './ethTokens.json'

export const getRequestOptions = (url: string, qs?: object) => ({
  json: true,
  method: 'GET',
  qs,
  url
})
