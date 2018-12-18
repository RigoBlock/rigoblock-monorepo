import Web3 = require('web3')
import { CONTRACT_ADDRESSES, EFX_TOKENS_LIST, NETWORKS } from '../../constants'
import { postJSON, toBn, toUnitAmount } from '../../utils'
import { supportedExchanges } from '@rigoblock/exchange-connector'
import exchangeConnector from '../../exchangeConnector'
import fetchContracts from '@rigoblock/contracts'
import redis from '../../redis'
import statsD from '../../statsd'
import web3ErrorWrapper from '../web3ErrorWrapper'

const getTokensAndBalances = async (
  web3: Web3,
  erc20Abi: any,
  dragoAddress: string,
  networkId: NETWORKS
) => {
  const response = await postJSON(EFX_TOKENS_LIST[networkId])
  const { tokenRegistry } = response['0x']
  const allTokens = {
    tokenRegistry,
    ...{
      WETH: {
        decimals: 18,
        tokenAddress: CONTRACT_ADDRESSES[networkId].WETH,
        wrapperAddress: null
      }
    }
  }
  const balancePromises = Object.keys(tokenRegistry).map(async symbol => {
    const { tokenAddress, wrapperAddress, decimals } = tokenRegistry[symbol]
    let tokenBalance
    if (!tokenAddress && symbol === 'ETH') {
      tokenBalance = await web3.eth.getBalance(dragoAddress)
    } else {
      const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress)
      tokenBalance = await tokenContract.methods.balanceOf(dragoAddress).call()
    }
    const wrapperContract = new web3.eth.Contract(erc20Abi, wrapperAddress)
    const wrapperBalance = await wrapperContract.methods
      .balanceOf(dragoAddress)
      .call()
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
  const wethContract = new web3.eth.Contract(
    erc20Abi,
    CONTRACT_ADDRESSES[networkId].WETH
  )
  const wethBalance = await wethContract.methods.balanceOf(dragoAddress).call()
  let tokenBalances = await Promise.all(balancePromises)
  tokenBalances = tokenBalances.filter(
    token => !!token.balances.total.toNumber()
  )
  tokenBalances.push({
    symbol: 'WETH',
    decimals: 18,
    balances: {
      total: toBn(wethBalance),
      wrapper: toBn(0),
      token: toBn(wethBalance)
    }
  })
  return
}

const getTradingSymbols = tokensArray =>
  tokensArray.map(token => {
    const { symbol } = token
    if (symbol === 'ETH') {
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
  return tokenWithSymbols.map(token => {
    const { symbol, tradingSymbol } = token
    if (symbol === 'ETH') {
      token.priceEth = 1
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
      token.priceEth = toBn(ticker[7])
    }
    return token
  })
}

// Balance * prezzo / decimali
const calculateWeiAmount = tokens =>
  tokens.map(token => {
    const { symbol, priceEth, balances, decimals } = token
    if (symbol === 'ETH') {
      token.weiBalance = balances.total
      return token
    }
    token.weiBalance = toUnitAmount(balances.total, decimals)
      .times(priceEth)
      .times(1e18)
    return token
  })

const getTotalSupply = async contract => {
  const totalSupply = await contract.methods.totalSupply().call()
  return toUnitAmount(totalSupply, 6)
}

const calculateNavInWei = (tokens, totalSupply) => {
  const totalWeiBalance = tokens.reduce(
    (acc, curr) => acc.plus(curr.weiBalance),
    toBn(0)
  )
  return totalWeiBalance.div(totalSupply)
}

const task = async (job, web3: Web3) => {
  const { key, network, poolType } = job.data
  const contractsMap = await fetchContracts(network)
  const pools = await redis.hgetall(`${key}:${network}`)

  const addresses = Object.keys(pools)
  const erc20Abi = contractsMap.ERC20.abi
  const promises = addresses.map(async address => {
    const poolContract = new web3.eth.Contract(
      contractsMap[poolType].abi,
      address
    )
    const totalSupply = await getTotalSupply(poolContract)
    const tokensWithBalances = await getTokensAndBalances(
      web3,
      erc20Abi,
      address,
      network
    )
    const tokensWithPrices = await fetchTokenPrices(tokensWithBalances, network)
    const tokensWithWeiAmount = await calculateWeiAmount(tokensWithPrices)
    const navInWei = await calculateNavInWei(tokensWithWeiAmount, totalSupply)
  })

  // const poolAbi = contractsMap[poolType].abi

  // const navPrices = await Promise.all(
  //   Object.keys(pools).map(async address => {
  //     const contract = new web3.eth.Contract(poolAbi, address)
  //     const poolData = await contract.methods.getData().call()
  //     const { buyPrice } = poolData
  //     return {
  //       address,
  //       buyPrice
  //     }
  //   })
  // )

  // const navPromises = navPrices.map(
  //   pool =>
  //     new Promise((resolve, reject) => {
  //       statsD.gauge(
  //         `${poolType}.${pool.address}.price,network=${network},price_type=nav`,
  //         pool.buyPrice,
  //         (error, bytes) => (error ? reject(error) : resolve(bytes))
  //       )
  //     })
  // )

  // return Promise.all(navPromises)
}

export default web3ErrorWrapper(task)
