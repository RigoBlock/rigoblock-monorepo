// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

export const ERCdEX = 'ERCdEX'
export const Ethfinex = 'Ethfinex'

export const NETWORKS_ID = {
  mainnet: 1,
  ropsten: 3,
  kovan: 42,
  1: 'mainnet',
  3: 'ropsten',
  42: 'kovan'
}

export const SupportedExchanges = {
  ERCdEX: {
    supportedNetworks: ['1', '42'],
    tickersTokenPairs: [],
    http: {
      mainnet: 'https://api.ercdex.com/api',
      ropsten: 'https://api.ercdex.com/api',
      kovan: 'https://api.ercdex.com/api'
    },
    ws: {
      mainnet: 'wss://api.ercdex.com',
      ropsten: 'wss://api.ercdex.com',
      kovan: 'wss://api.ercdex.com'
    }
  },
  Ethfinex: {
    supportedNetworks: ['1', '42'],
    tickersTokenPairs: ['tZRXETH', 'tMKRETH', 'tGNTETH'],
    http: {
      mainnet: 'https://api.ethfinex.com/v2',
      ropsten: 'https://test.ethfinex.com/v2',
      kovan: 'https://test.ethfinex.com/v2'
    },
    ws: {
      mainnet: 'wss://api.ethfinex.com/v2',
      ropsten: 'wss://test.ethfinex.com/v2',
      kovan: 'wss://test.ethfinex.com/v2'
    }
  }
}
