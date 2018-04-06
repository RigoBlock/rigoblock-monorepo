// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../../contracts/abi';
import Registry from '../registry';

class VaultParity {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.vault
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
  }

  get instance () {
    if (typeof this._instance === 'undefined') {
      throw new Error('The contract needs to be initialized.')
    }
    return this._instance;
  }

  init = (address) => {
    if (!address) {
      throw new Error('Contract address needs to be provided')
    }
    const api = this._api
    const abi = this._abi
    this._instance = api.newContract(abi, address).instance
    return this._instance
  }

  balanceOf = (accountAddress) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    const instance = this._instance
    return instance.balanceOf.call({}, [accountAddress])
  }

  getData = () => {
    const instance = this._instance
    return instance.getData.call({})
  }

  buyVault = (accountAddress, amount) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    if (!amount) {
      throw new Error('amount needs to be provided')
    }
    const instance = this._instance
    const options = {
      from: accountAddress,
      value: amount
    }
    // return instance.buyVault.postTransaction(options, [])
    return instance.buyVault
    .estimateGas(options, [])
    .then((gasEstimate) => {
      options.gas =  gasEstimate.mul(1.2).toFixed(0);
      console.log(`Buy Vault: gas estimated as ${gasEstimate.toFixed(0)} setting to ${options.gas}`)
      return instance.buyVault.postTransaction(options, [])
    })
  }

  getPrice = () => {
    const instance = this._instance
    return instance.getPrice.call({})
  }

  getAdminData = () => {
    const instance = this._instance
    return instance.getAdminData.call({})
  }

  sellVault = (accountAddress, amount) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    if (!amount) {
      throw new Error('amount needs to be provided')
    }
    const instance = this._instance
    const values = [amount]
    const options = {
      from: accountAddress
    }
    return instance.sellVault
    .estimateGas(options, values)
    .then((gasEstimate) => {
      options.gas =  gasEstimate.mul(1.2).toFixed(0);
      console.log(`Sell Vault: gas estimated as ${gasEstimate.toFixed(0)} setting to ${options.gas}.`)
      return instance.sellVault.postTransaction(options, values)
    })
  }

  setTransactionFee = (accountAddress, price) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    if (!price) {
      throw new Error('price needs to be provided')
    }
    // const api = this._api
    // const basisPoints = api.util.toWei(price * 100, 'ether')
    const basisPoints = (price * 100).toFixed(0)
    console.log(basisPoints)
    const values = [basisPoints]
    const instance = this._instance
    const options = {
      from: accountAddress
    }
    return instance.setTransactionFee
    .estimateGas(options, values)
    .then((gasEstimate) => {
      options.gas =  gasEstimate.mul(1.2).toFixed(0);
      console.log(`setTransactionFee Vault: gas estimated as ${gasEstimate.toFixed(0)} setting to ${options.gas}. Setting values: ${values}`)
      return instance.setTransactionFee.postTransaction(options, values)
    })

  }

  totalSupply =() =>{
    const instance = this._instance
    return instance.totalSupply.call({},[])
  }

}



export default VaultParity;
