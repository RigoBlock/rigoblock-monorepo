import Web3 = require('web3')
import { postJSON } from './utils'
import fetchContracts from '@rigoblock/contracts'

const getAllBalances = async (web3, dragoAddress, efxUrl) => {
  const contractsMap = await fetchContracts(3)
  const erc20Abi = contractsMap.ERC20.abi
  const response = await postJSON(efxUrl)
  const { tokenRegistry } = response['0x']

  const getContracts = (obj, addressType, suffix = '') =>
    Object.keys(obj)
      .map(name => {
        const address = obj[name][addressType]
        return address
          ? {
              name: name + suffix,
              contract: new web3.eth.Contract(erc20Abi, address)
            }
          : null
      })
      .filter(val => !!val)

  const tokens = getContracts(tokenRegistry, 'tokenAddress')
  const wrappers = getContracts(tokenRegistry, 'wrapperAddress', 'W')

  const getBalancePromises = arr =>
    arr.map(async ({ name, contract }) => {
      const balance = await contract.methods.balanceOf(dragoAddress).call()
      return {
        name,
        balance
      }
    })

  const balancePromises = getBalancePromises([...tokens, ...wrappers])

  const allBalances = await Promise.all(balancePromises)
  const ethBalance = await web3.eth.getBalance(dragoAddress)
  allBalances.push({ name: 'ETH', balance: ethBalance })
  return allBalances
}

const getData = async () => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/')
  )
  const dragoAddress = '0x2F3ae8c5e7321688999883Fd4f569e928d81D68f'
  const efxUrl = 'https://test.ethfinex.com/trustless/v1/r/get/conf'
  const allBalances = await getAllBalances(web3, dragoAddress, efxUrl)
  console.log(allBalances)
}

getData()
