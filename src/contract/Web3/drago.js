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
    this._abi = abis.drago
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

  buyDrago = (accountAddress, amount) => {
    const instance = this._instance
    var options = {
      from: accountAddress,
      value: amount
    }
    console.log(accountAddress)
    console.log(amount)
    // options.gas = 110053
    // return instance.methods.buyDrago()
    // .send(options)
    return instance.methods.buyDrago().estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      options.gas = gasEstimate
    }
    )
    .then (() =>{
      return instance.methods.buyDrago()
      .send(options)
    })
  }

  depositToExchange = (accountAddress, exchangeAddress, tokenAddress, amount) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    if (!exchangeAddress) {
      throw new Error('exchangeAddress needs to be provided')
    }
    if (!tokenAddress) {
      throw new Error('tokenAddress needs to be provided')
    }
    if (!amount) {
      throw new Error('amount needs to be provided')
    }
    const instance = this._instance
    const options = {
      from: accountAddress
    };
    instance.options.from = options.from
    const values = [exchangeAddress, tokenAddress, amount]
    return instance.methods.depositToExchange(exchangeAddress, tokenAddress, amount).estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      instance.options.gas =  gasEstimate
      return instance.methods.depositToExchange(exchangeAddress, tokenAddress, amount)
        .send(options)
      }
    )
  }

  placeOrderCFDExchange = (accountAddress, exchangeAddress, cfd, is_stable, adjustment, stake) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    if (!exchangeAddress) {
      throw new Error('exchangeAddress needs to be provided')
    }
    if (!cfd) {
      throw new Error('cfd needs to be provided')
    }
    if (!is_stable) {
      throw new Error('is_stable needs to be provided')
    }
    if (!adjustment) {
      throw new Error('adjustment needs to be provided')
    }
    if (!stake) {
      throw new Error('stake needs to be provided')
    }
    const instance = this._instance
    const options = {
      from: accountAddress
    };
    console.log(exchangeAddress)
    return instance.methods.placeOrderCFDExchange(exchangeAddress, exchangeAddress, cfd, is_stable, adjustment, stake)
    .estimateGas(options)
    .then((gasEstimate) => {
      options.gas = gasEstimate
      return instance.methods.placeOrderCFDExchange(exchangeAddress, exchangeAddress, cfd, is_stable, adjustment, stake)
        .send(options)
    })
    .catch((error) => {
      console.error('error', error)
    })
  }

  sellDrago = (accountAddress, amount) => {
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
    return instance.methods.sellDrago(amount).estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      options.gas = gasEstimate
    })
    .then(()=>{
      return instance.methods.sellDrago(amount).send(options)
    })
  }

  setPrices = (accountAddress, buyPrice, sellPrice) => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    if (!buyPrice) {
      throw new Error('buyPrice needs to be provided')
    }
    if (!sellPrice) {
      throw new Error('sellPrice needs to be provided')
    }
    const instance = this._instance
    var options = {
      from: accountAddress,
    }
    instance.options.from = accountAddress
    const api = this._api
    const buyPriceWei = api.utils.toWei(buyPrice, 'ether')
    const sellPriceWei = api.utils.toWei(sellPrice, 'ether')
    const values = [sellPriceWei, buyPriceWei]
    return instance.methods.setPrices(sellPriceWei, buyPriceWei)
    .estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      // console.log(gasEstimate.toFormat())
      options.gas = gasEstimate
      console.log(instance)
      return instance.methods.setPrices(sellPriceWei, buyPriceWei).send(options)
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
