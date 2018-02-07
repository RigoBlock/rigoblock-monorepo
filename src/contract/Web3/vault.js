// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../abi';
import Registry from '../registry';

class DragoWeb3 {
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
    const contractAbi = this._abi
    this._instance = new api.eth.Contract(abi)
    this._instance.options.address = address
  }

  getData = () => {
    const instance = this._instance
    return instance.getData.call({})
  }

  buyVault = (accountAddress, amount) => {
    const instance = this._instance
    var options = {
      from: accountAddress,
      value: amount
    }
    return instance.methods.buyGabcoin().estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      options.gas = gasEstimate
    }
    )
    .then (() =>{
      return instance.methods.buyGabcoin()
      .send(options)
    })
  }

  sellVault = (accountAddress, amount) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    if (!amount) {
      throw new Error('amount needs to be provided')
    }
    const instance = this._instance
    var options = {
      from: accountAddress,
    }
    console.log(amount)
    return instance.methods.sellVault(amount).estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      options.gas = gasEstimate
    })
    .then(()=>{
      return instance.methods.sellVault(amount).send(options)
    })
  }

  setTransactionFee = (accountAddress, price) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    if (!price) {
      throw new Error('price needs to be provided')
    }
    const instance = this._instance
    var options = {
      from: accountAddress,
    }
    instance.options.from = accountAddress
    const api = this._api
    const basisPoints = price * 100
    const values = [basisPoints]
    return instance.methods.setTransactionFee(basisPoints)
    .estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      // console.log(gasEstimate.toFormat())
      options.gas = gasEstimate
      console.log(instance)
      return instance.methods.setTransactionFee(basisPoints).send(options)
    })
    .catch((error) => {
      console.error('error', error)
    })
  }

  totalSupply =() =>{
    const instance = this._instance
    return instance.methods.totalSupply.call({})
  }
}

export default DragoWeb3;
