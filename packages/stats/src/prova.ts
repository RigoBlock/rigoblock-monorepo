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
  const allTokens = {
    ...tokenRegistry,
    ...{
      WETH: {
        decimals: 18,
        tokenAddress: CONTRACT_ADDRESSES[networkId].WETH,
        wrapperAddress: null
      }
    }
  }
  const balancePromises = Object.keys(allTokens).map(async symbol => {
    const { tokenAddress, wrapperAddress, decimals } = allTokens[symbol]
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

const fetchPrices = async (tokens, networkId) => {
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
    const { tradingSymbol } = token
    if (!tradingSymbol) {
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
  const dragoAddress = '0xb528A4b28b4E28C69CAf9769f066682EF2654c13'
  // const dragoAddress = '0x0D9E347bDd380783ead06af6A95A69EC3A460d30'
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
  console.log(tokenBalances)
  const withPrices = await fetchPrices(tokenBalances, network)
  const withEthAmount = await calculateWeiAmount(withPrices)

  const totalSupply = await getTotalSupply(poolContract)
  const navInWei = await calculateNavInWei(withEthAmount, totalSupply)
  console.log(navInWei.div(1e18).toString())
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
