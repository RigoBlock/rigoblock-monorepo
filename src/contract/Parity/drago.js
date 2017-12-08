// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../abi';
import Registry from '../registry';

class DragoParity {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.drago
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
  }

  instance = (address) => {
    if (!address) {
      throw new Error('Contract address needs to be provided')
    }
    const api = this._api
    const abi = this._abi
    const contractAbi = this._abi
    this._instance = api.newContract(abi, address).instance
    return this._instance
  }

  getData = () => {
    const instance = this._instance
    return instance.getData.call({})
  }

  buyDrago = (options, values) => {
    const instance = this._instance
    Array.isArray(values) ? values : values = values[values]
    return instance.buyDrago
    .estimateGas(options, values)
    .then((gasEstimate) => {
      options.gas =  gasEstimate.mul(1.2).toFixed(0);
      console.log(`Buy drago: gas estimated as ${gasEstimate.toFixed(0)} setting to ${options.gas}`)
      return instance.buyDrago.postTransaction(options, values)
    })
  }

  sellDrago = (options, values) => {
    const instance = this._instance
    Array.isArray(values) ? values : values = values[values]
    return instance.sellDrago
    .estimateGas(options, values)
    .then((gasEstimate) => {
      options.gas =  gasEstimate.mul(1.2).toFixed(0);
      console.log(`Sell drago: gas estimated as ${gasEstimate.toFixed(0)} setting to ${options.gas}`)
      return instance.sellDrago.postTransaction(options, values)
    })
  }
}

export default DragoParity;
