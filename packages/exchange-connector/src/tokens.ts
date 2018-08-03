import { TOKENS_DATA_ENDPOINT } from './constants'
import fetch from 'node-fetch'

export type TokensData = TokenData[]

export type TokenData = {
  address: string
  symbol: string
  decimal: number
  type: 'default'
}

let tokens: TokensData = []

export async function getTokensData(force = false): Promise<TokensData> {
  if (tokens.length && !force) {
    return tokens
  }

  const response = await fetch(TOKENS_DATA_ENDPOINT)
  tokens = await response.json()

  return tokens
}

export async function getAddressBySymbol(symbol: string): Promise<string> {
  const tokens = await getTokensData()
  const token = tokens.filter(t => t.symbol === symbol).shift()
  return token && token.address
}
