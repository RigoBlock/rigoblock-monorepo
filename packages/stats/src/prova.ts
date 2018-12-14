import Web3 = require('web3')
import { BigNumber } from 'bignumber.js'
import { NETWORKS, supportedExchanges } from '@rigoblock/exchange-connector'
import { postJSON } from './utils'
import exchangeConnector from './exchangeConnector'
import fetchContracts from '@rigoblock/contracts'

const getAllBalances = async (web3, dragoAddress, efxUrl) => {
  const contractsMap = await fetchContracts(1)
  const erc20Abi = contractsMap.ERC20.abi
  const response = await postJSON(efxUrl)
  const { tokenRegistry } = response['0x']

  const balancePromises = Object.keys(tokenRegistry).map(async name => {
    const { tokenAddress, wrapperAddress } = tokenRegistry[name]
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
      tokenBalance,
      wrapperBalance,
      totalBalance: new BigNumber(wrapperBalance).plus(
        new BigNumber(tokenBalance)
      )
    }
  })
  return Promise.all(balancePromises)
}

const fetchPrice = async (symbols, networkId) => {
  const exchange = exchangeConnector.getExchange(
    supportedExchanges.ETHFINEX_RAW,
    { networkId }
  )
  const tickers = await exchange.http.getTickers({
    symbols: [symbols, 'ETHUSD']
  })
  console.log(tickers)
}

const fetchPrices = async tokens => {
  const res = await fetchPrice('GNTETH', NETWORKS.MAINNET)
  const symbols = tokens.map(({ name }) => {
    if (name === 'ETH') {
      return name
    }
    if (name === 'USD') {
      return 'ETHUSD'
    }
    return `${name}ETH`
  })
}

const getData = async () => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/')
  )
  const dragoAddress = '0xba38BA610f0e26E5e2C23f5bA6ecC2D09a7DF4fd'
  // const dragoAddress = '0x2F3ae8c5e7321688999883Fd4f569e928d81D68f'
  const efxUrl = 'https://api.ethfinex.com/trustless/v1/r/get/conf'
  // const efxUrl = 'https://test.ethfinex.com/trustless/v1/r/get/conf'
  const allBalances = await getAllBalances(web3, dragoAddress, efxUrl)
  const prices = await fetchPrices(allBalances)
}

getData()
