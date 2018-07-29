// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import { formatTickers } from './format'

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
  const $resultsERCdEX = formatTickers.ERCDeX(outputERCdEX)
  it(`ERCdEX format ticket success`, () => {
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
  const $resultsEthfinex = formatTickers.Ethfinex(outputEthfinex)
  it(`ERCdEX format ticket success`, () => {
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