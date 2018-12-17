import Web3 = require('web3')
import { BigNumber } from 'bignumber.js'
import { NETWORKS, supportedExchanges } from '@rigoblock/exchange-connector'
import { postJSON } from './utils'
import { toBn, toUnitAmount } from './utils'
import exchangeConnector from './exchangeConnector'
import fetchContracts from '@rigoblock/contracts'

const getAllBalances = async (web3, erc20Abi, dragoAddress, efxUrl) => {
  const response = await postJSON(efxUrl)
  const { tokenRegistry } = response['0x']
  const balancePromises = Object.keys(tokenRegistry).map(async name => {
    const { tokenAddress, wrapperAddress, decimals } = tokenRegistry[name]
    let tokenBalance
    if (!tokenAddress && name === 'ETH') {
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
      name,
      decimals,
      balances: {
        token: toBn(tokenBalance),
        wrapper: toBn(wrapperBalance),
        total: toBn(tokenBalance).plus(toBn(wrapperBalance))
      }
    }
  })
  const balances = await Promise.all(balancePromises)
  return balances.filter(token => !!token.balances.total.toNumber())
}

const getTradingSymbols = tokensArray =>
  tokensArray.map(token => {
    const { name } = token
    if (name === 'ETH') {
      token.symbol = null
    } else if (name === 'USD') {
      token.symbol = 'ETHUSD'
    } else {
      token.symbol = `${name}ETH`
    }
    return token
  })

const fetchPrices = async tokens => {
  const exchange = exchangeConnector.getExchange(
    supportedExchanges.ETHFINEX_RAW,
    { networkId: NETWORKS.MAINNET }
  )
  const tokenWithSymbols = getTradingSymbols(tokens)
  const symbols = tokenWithSymbols
    .map(token => token.symbol)
    .filter(val => !!val)

  const tickers = await exchange.http.getTickers({ symbols })
  return tokenWithSymbols.map(token => {
    const { name, symbol } = token
    if (name === 'ETH') {
      token.priceEth = 1
      return token
    }

    const ticker = tickers
      .filter(ticker => {
        return ticker[0] === `t${symbol}`
      })
      .pop()

    if (symbol === 'ETHUSD') {
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
    const { name, priceEth, balances, decimals } = token
    if (name === 'ETH') {
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

const calculateNav = (tokens, totalSupply) => {
  const totalWeiBalance = tokens.reduce(
    (acc, curr) => acc.plus(curr.weiBalance),
    toBn(0)
  )
  console.log('WEI', totalWeiBalance.toString())
  console.log('ETH', totalWeiBalance.div(1e18).toString())
  const weiNav = totalWeiBalance.div(totalSupply)
  console.log('WEI NAV', weiNav.toString())
  console.log('ETH NAV', weiNav.div(1e18).toString())
}

const getData = async () => {
  const dragoAddress = '0xb528A4b28b4E28C69CAf9769f066682EF2654c13'
  const efxUrl = 'https://api.ethfinex.com/trustless/v1/r/get/conf'
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/')
  )
  const contractsMap = await fetchContracts(1)
  const erc20Abi = contractsMap.ERC20.abi
  const poolContract = new web3.eth.Contract(
    contractsMap.Drago.abi,
    dragoAddress
  )
  const tokensWithBalances = await getAllBalances(
    web3,
    erc20Abi,
    dragoAddress,
    efxUrl
  )
  const withPrices = await fetchPrices(tokensWithBalances)
  const withEthAmount = await calculateWeiAmount(withPrices)

  const totalSupply = await getTotalSupply(poolContract)
  const nav = await calculateNav(withEthAmount, totalSupply)
}

getData()
