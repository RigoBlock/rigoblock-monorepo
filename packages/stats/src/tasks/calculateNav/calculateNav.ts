import Web3 = require('web3')
import {
  CONTRACT_ADDRESSES,
  DECIMAL_PLACES,
  EFX_TOKENS_LIST,
  POOL_DECIMALS
} from '../../constants'
import { NETWORKS, supportedExchanges } from '@rigoblock/exchange-connector'
import { postJSON, toBn, toUnitAmount } from '../../utils'
import exchangeConnector from '../../exchangeConnector'
import fetchContracts from '@rigoblock/contracts'
import redis from '../../redis'
import statsD from '../../statsd'
import web3ErrorWrapper from '../web3ErrorWrapper'

// TODO: change this as soon as we include the utility contract in the rigoblock contracts pkg
const getMultipleBalancesAbi = require('../../../getMultipleBalances.json')

const fetchTokenBalances = async (
  web3: Web3,
  utilityContract: any,
  dragoAddress: string,
  tokensList: any
) => {
  const allAddressess = tokensList
    .map(token => [token.tokenAddress, token.wrapperAddress])
    .reduce((acc, curr) => [...acc, ...curr], [])
    .filter(val => !!val)
  const ethBalance = await web3.eth.getBalance(dragoAddress)
  const balancesAndAddresses = await utilityContract.methods
    .getMultiBalancesAndAddressesFromAddresses(allAddressess, dragoAddress)
    .call()
  let { tokenAddresses, balances } = balancesAndAddresses
  tokenAddresses = tokenAddresses.map(val => val.toLowerCase())

  return tokensList.map(token => {
    const { tokenAddress, wrapperAddress, symbol } = token
    let wrapperBalance: any = '0'
    let tokenBalance: any = '0'
    if (symbol === 'ETH') {
      tokenBalance = ethBalance
    } else {
      const tokenIndex = tokenAddresses.indexOf(tokenAddress.toLowerCase())
      tokenBalance = balances[tokenIndex]
    }
    if (wrapperAddress) {
      const wrapperIndex = tokenAddresses.indexOf(wrapperAddress.toLowerCase())
      wrapperBalance = balances[wrapperIndex]
    }
    token.balances = {
      token: toBn(tokenBalance),
      wrapper: toBn(wrapperBalance),
      total: toBn(tokenBalance).plus(toBn(wrapperBalance))
    }
    return token
  })
}

const getTradingSymbols = tokensArray =>
  tokensArray.map(token => {
    const { symbol } = token
    if (symbol === 'ETH' || symbol === 'WETH') {
      token.tradingSymbol = null
    } else if (symbol === 'USD') {
      token.tradingSymbol = 'ETHUSD'
    } else {
      token.tradingSymbol = `${symbol}ETH`
    }
    return token
  })

const fetchTokenPrices = async (tokens, networkId) => {
  const exchange = exchangeConnector.getExchange(
    supportedExchanges.ETHFINEX_RAW,
    { networkId }
  )
  const tokenWithSymbols = getTradingSymbols(tokens)
  const symbols = tokenWithSymbols
    .map(token => token.tradingSymbol)
    .filter(val => !!val)

  const tickers = await exchange.http.getTickers({ symbols })
  // for ratelimit or other efx related errors
  if ((tickers as any)[0] === 'error') {
    throw new Error((tickers as any)[2])
  }

  return tokenWithSymbols.map(token => {
    const { tradingSymbol } = token
    if (!tradingSymbol) {
      token.priceEth = toBn(1)
      return token
    }

    const ticker = tickers
      .filter(ticker => {
        return ticker[0] === `t${tradingSymbol}`
      })
      .pop()
    if (tradingSymbol === 'ETHUSD') {
      token.priceEth = toBn(1).div(toBn(ticker[7]))
    } else {
      token.priceEth = toBn(ticker[7]).dp(DECIMAL_PLACES)
    }
    return token
  })
}

// wei amount = (balance token + balance wrapper) * eth price
// sum all wei amounts and divide total by total supply
const calculateNav = async (tokens, contract) => {
  const totalWeiAmount = tokens
    .map(token => {
      const { priceEth, balances, decimals } = token
      // since tokens have different decimals, divide them by 10^decimals,
      // multiply by price and then multiply by 1e18 to obtain wei amount
      return toUnitAmount(balances.total, decimals)
        .times(priceEth)
        .times(1e18)
    })
    .reduce((acc, curr) => acc.plus(curr), toBn(0))
  const totalSupply = await contract.methods.totalSupply().call()
  if (totalSupply === '0') {
    return toBn(0)
  }
  return totalWeiAmount.div(toUnitAmount(totalSupply, POOL_DECIMALS))
}

const task = async (job, web3: Web3) => {
  const { key, network, poolType } = job.data
  const contractsMap = await fetchContracts(network)
  const utilityContract = new web3.eth.Contract(
    getMultipleBalancesAbi,
    CONTRACT_ADDRESSES[network].GET_ALL_BALANCES
  )
  const response = await postJSON(EFX_TOKENS_LIST[network])
  const { tokenRegistry } = response['0x']
  const tokensList = Object.keys(tokenRegistry).map(symbol => ({
    ...tokenRegistry[symbol],
    symbol
  }))
  tokensList.push({
    symbol: 'WETH',
    decimals: 18,
    tokenAddress: CONTRACT_ADDRESSES[network].WETH,
    wrapperAddress: null
  })
  const tokensWithPrices = await fetchTokenPrices(tokensList, network)
  const pools = await redis.hgetall(`${key}:${network}`)

  const navPromises = Object.keys(pools).map(async address => {
    const poolContract = new web3.eth.Contract(
      contractsMap[poolType].abi,
      address
    )
    const tokensWithBalances = await fetchTokenBalances(
      web3,
      utilityContract,
      address,
      tokensWithPrices
    )

    const nav = await calculateNav(tokensWithBalances, poolContract)
    const labels = tokensWithBalances.map(({ symbol, balances, priceEth }) => {
      const wrapperLabel =
        symbol === 'WETH'
          ? ''
          : `,${symbol}W_balance=${balances.wrapper.toFixed(DECIMAL_PLACES)}`
      return (
        `${symbol}_balance=${balances.token.toFixed(
          DECIMAL_PLACES
        )},${symbol}_price=${priceEth.toFixed(DECIMAL_PLACES)}` + wrapperLabel
      )
    })
    return {
      address,
      nav: nav.toFixed(DECIMAL_PLACES),
      labels: labels.join()
    }
  })

  const navs = await Promise.all(navPromises)
  const gaugePromises = navs.map(
    pool =>
      new Promise((resolve, reject) => {
        statsD.gauge(
          `${poolType}.${pool.address}.nav,network=${network},${pool.labels}`,
          pool.nav,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )
  return Promise.all(gaugePromises)
}

export default web3ErrorWrapper(task)
