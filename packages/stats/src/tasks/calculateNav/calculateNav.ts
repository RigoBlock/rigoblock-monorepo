import Web3 = require('web3')
import { CONTRACT_ADDRESSES, EFX_TOKENS_LIST } from '../../constants'
import { NETWORKS, supportedExchanges } from '@rigoblock/exchange-connector'
import { postJSON, toBn, toUnitAmount } from '../../utils'
import exchangeConnector from '../../exchangeConnector'
import fetchContracts from '@rigoblock/contracts'
import redis from '../../redis'
import statsD from '../../statsd'
import web3ErrorWrapper from '../web3ErrorWrapper'

// Fetch tokens and wrappers list and calculate fund's balance of each
const getTokensAndBalances = async (
  web3: Web3,
  erc20Abi: any,
  dragoAddress: string,
  tokensArray: any
) => {
  const balancePromises = Object.keys(tokensArray).map(async symbol => {
    const { tokenAddress, wrapperAddress, decimals } = tokensArray[symbol]
    let tokenBalance
    if (!tokenAddress && symbol === 'ETH') {
      tokenBalance = await web3.eth.getBalance(dragoAddress)
    } else {
      const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress)
      tokenBalance = await tokenContract.methods.balanceOf(dragoAddress).call()
    }
    let wrapperBalance = '0'
    if (wrapperAddress) {
      const wrapperContract = new web3.eth.Contract(erc20Abi, wrapperAddress)
      wrapperBalance = await wrapperContract.methods
        .balanceOf(dragoAddress)
        .call()
    }
    return {
      symbol,
      decimals,
      balances: {
        token: toBn(tokenBalance),
        wrapper: toBn(wrapperBalance),
        total: toBn(tokenBalance).plus(toBn(wrapperBalance))
      }
    }
  })
  return Promise.all(balancePromises)
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

// Map token array and fetch prices
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
      token.priceEth = toBn(ticker[7]).dp(5)
    }
    return token
  })
}

// map tokens to calculate WEI amount, sum it all and divide by total supply
const calculateNav = async (tokens, contract) => {
  const totalWeiAmount = tokens
    .map(token => {
      const { priceEth, balances, decimals } = token
      if (priceEth === 1) {
        return balances.total
      }
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
  return totalWeiAmount.div(toUnitAmount(totalSupply, 6))
}

const task = async (job, web3: Web3) => {
  const { key, network, poolType } = job.data
  const contractsMap = await fetchContracts(network)
  const response = await postJSON(EFX_TOKENS_LIST[network])
  const { tokenRegistry } = response['0x']
  const tokensArray = {
    ...tokenRegistry,
    ...{
      WETH: {
        decimals: 18,
        tokenAddress: CONTRACT_ADDRESSES[network].WETH,
        wrapperAddress: null
      }
    }
  }
  const pools = await redis.hgetall(`${key}:${network}`)

  const erc20Abi = contractsMap.ERC20.abi
  const navPromises = Object.keys(pools).map(async address => {
    const poolContract = new web3.eth.Contract(
      contractsMap[poolType].abi,
      address
    )
    const tokensWithBalances = await getTokensAndBalances(
      web3,
      erc20Abi,
      address,
      tokensArray
    )
    const tokensWithPrices = await fetchTokenPrices(tokensWithBalances, network)
    const nav = await calculateNav(tokensWithPrices, poolContract)
    const labels = tokensWithPrices.map(({ symbol, balances, priceEth }) => {
      const wrapperLabel =
        symbol === 'WETH'
          ? ''
          : `,${symbol}W_Balance=${balances.wrapper.toFixed(5)}`
      return (
        `${symbol}_Balance=${balances.token.toFixed(
          5
        )},${symbol}_Price=${priceEth.toFixed(5)}` + wrapperLabel
      )
    })
    return {
      address,
      nav: nav.toFixed(5),
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
