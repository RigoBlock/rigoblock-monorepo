// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import * as FORMAT from './format'
import {
  ERCdEX,
  Ethfinex
} from './const' 

describe("format exchange tickers output", () => {
  const outputERCdEX = [
    {
      btcPrice: "0.0569188",
      dailyPercentageChange: "-1.06",
      dailyVolume: "1530930000.0",
      hourlyPercentageChange: "-0.01",
      id: "ethereum",
      name: "Ethereum",
      priceEth: "1",
      symbol: "ETH",
      usdPrice: "464.706",
      weeklyPercentageChange: "-0.07"
    },
    {
      btcPrice: "0.00084028",
      dailyPercentageChange: "-1.3",
      dailyVolume: "49320500.0",
      hourlyPercentageChange: "-0.13", id: "omisego",
      name: "OmiseGO",
      priceEth: "0.01476278487951257",
      symbol: "OMG",
      usdPrice: "6.86036",
      weeklyPercentageChange: "-2.18",
    }
  ]
  const $resultsERCdEX = FORMAT.tickers[ERCdEX](outputERCdEX)
  it(`${ERCdEX} format ticket success`, () => {
    expect($resultsERCdEX)
    .toEqual(
      [
        {
          priceEth: '1',
          priceUsd: '464.706',
          symbol: 'ETH',
        },
        {
          priceEth: '0.01476278487951257',
          priceUsd: '6.86036',
          symbol: 'OMG',
        }
      ]
    )
  })
  const outputEthfinex = [
    [
      "tZRXETH",
      0.002581,
      65432.52993716,
      0.0026068,
      191086.94028059,
      -0.0000594,
      -0.0224,
      0.0025906,
      72054.20088213,
      0.0026642,
      0.0025906
    ],
    [
      "tMKRETH",
      1.257,
      51.7239878,
      1.4053,
      42.12054831,
      0.0001,
      0.0001,
      1.2571,
      0.48,
      0,
      0
    ]
  ]
  const $resultsEthfinex = FORMAT.tickers[Ethfinex](outputEthfinex)
  it(`${Ethfinex} format ticket success`, () => {
    expect($resultsEthfinex)
    .toEqual(
      [
        {
          priceEth: '0.0025906',
          priceUsd: '',
          symbol: 'ZRX',
        },
        {
          priceEth: '1.2571',
          priceUsd: '',
          symbol: 'MKR',
        },
        {
          priceEth: '1',
          priceUsd: '',
          symbol: 'WETH'
        }
      ]
    )
  })
})

describe("format aggregate orders output", () => {

  const outputERCdEX = {
    sells: {
      priceLevels: [
        {
          price: "0.0045",
          volume: "35000000000000000000",
          volumeRatio: 0.4117647058823529
        },
        {
          price: "0.004",
          volume: "85000000000000000000",
          volumeRatio: 1
        }
      ]
    },
    buys: {
      "priceLevels": [
        {
          price: "0.0035",
          volume: "35000000000000000000",
          volumeRatio: 0.4117647058823529
        },
        {
          price: "0.003",
          volume: "35000000000000000000",
          volumeRatio: 0.4117647058823529
        }
      ]
    }
  }

  const $resultsERCdEX = FORMAT.aggregatedOrders[ERCdEX](outputERCdEX)
  it(`${ERCdEX} format aggregated orders success`, () => {
    expect($resultsERCdEX)
    .toEqual(
      {
        bids: [
          {
            orderAmount: "35.00000",
            orderPrice: "0.0035000"
          },
          {
            orderAmount: "35.00000",
            orderPrice: "0.0030000"
          }
        ],
        asks: [
          {
            orderAmount: "35.00000",
            orderPrice: "0.0045000"
          },
          {
            orderAmount: "85.00000",
            orderPrice: "0.0040000"
          }
        ],
        spread: "0.000500",
        aggregated: true
      }
    )
  })

  const outputEthfinex = 
    [
      [0.0024692,1,53.84960487],
      [0.0024641,1,1000],
      [0.0024842,1,-0.78238236],
      [0.0024929,1,-3921]
    ]
  
  const $resultsEthfinex = FORMAT.aggregatedOrders[Ethfinex](outputEthfinex)
  it(`${Ethfinex} format aggregated orders success`, () => {
    expect($resultsEthfinex)
    .toEqual(
      {
        bids: [
          {
            orderAmount: "53.84960",
            orderPrice: "0.0024692"
          },
          {
            orderAmount: "1000.00000",
            orderPrice: "0.0024641"
          }
        ],
        asks: [
          {
            orderAmount: "3921.00000",
            orderPrice: "0.0024929"
          },
          {
            orderAmount: "0.78238",
            orderPrice: "0.0024842"
          }
        ],
        spread: "0.000015",
        aggregated: true
      }
    )
  })
})