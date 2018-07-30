// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

export const ERCdEX = 'ERCdEX'
export const Ethfinex = 'Ethfinex'

export const SupportedExchanges = {
  ERCdEX: {
    supportedNetworks: ['1', '42'],
    tickersTokenPairs: [],
    http: 'https://api.ercdex.com/api'
  },
  Ethfinex: {
    supportedNetworks: ['1', '42'],
    tickersTokenPairs: ['tZRXETH', 'tMKRETH', 'tGNTETH'],
    http: 'https://api.bitfinex.com/v2'
  },
}