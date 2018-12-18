import Web3 = require('web3')
import { CONTRACT_ADDRESSES, EFX_TOKENS_LIST } from './constants'
import { NETWORKS, supportedExchanges } from '@rigoblock/exchange-connector'
import { postJSON, toBn, toUnitAmount } from './utils'
import exchangeConnector from './exchangeConnector'
import fetchContracts from '@rigoblock/contracts'

const getTokensAndBalances = async (
  web3: Web3,
  erc20Abi: any,
  dragoAddress: string,
  networkId: NETWORKS
) => {
  const response = await postJSON(EFX_TOKENS_LIST[networkId])
  const { tokenRegistry } = response['0x']
  console.log(tokenRegistry)
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
  return tokenBalances
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

const fetchPrices = async tokens => {
  const exchange = exchangeConnector.getExchange(
    supportedExchanges.ETHFINEX_RAW,
    { networkId: NETWORKS.MAINNET }
  )
  const tokenWithSymbols = getTradingSymbols(tokens)
  const symbols = tokenWithSymbols
    .map(token => token.tradingSymbol)
    .filter(val => !!val)

  const tickers = await exchange.http.getTickers({ symbols })
  return tokenWithSymbols.map(token => {
    const { symbol, tradingSymbol } = token
    if (symbol === 'ETH' || symbol === 'WETH') {
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

const getData = async () => {
  const network = NETWORKS.MAINNET
  const poolType = 'Drago'
  // const dragoAddress = '0xb528A4b28b4E28C69CAf9769f066682EF2654c13'
  const dragoAddress = '0x0D9E347bDd380783ead06af6A95A69EC3A460d30'
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/')
  )
  const contractsMap = await fetchContracts(network)
  const erc20Abi = contractsMap.ERC20.abi
  const poolContract = new web3.eth.Contract(
    contractsMap.Drago.abi,
    dragoAddress
  )
  const tokenBalances = await getTokensAndBalances(
    web3,
    erc20Abi,
    dragoAddress,
    network
  )
  const withPrices = await fetchPrices(tokenBalances)
  const withEthAmount = await calculateWeiAmount(withPrices)

  const totalSupply = await getTotalSupply(poolContract)
  const navInWei = await calculateNavInWei(withEthAmount, totalSupply)
  const allTokensAndBalances = tokenBalances
    .map(({ symbol, balances }) => [
      { symbol: symbol, balance: balances.token.toString() },
      {
        symbol: `${symbol}W`,
        balance: balances.wrapper.toString()
      }
    ])
    .reduce((acc, curr) => [...acc, ...curr], [])
  console.log(allTokensAndBalances)
  // const result = {
  //   nav: navInWei.toString()
  //   balances: withEthAmount.map(({symbol, balances}) => ({symbol, balance: balances.total}))
  // }
  // console.log(navInWei.div(toBn(1e18)).toString())
}

getData()
