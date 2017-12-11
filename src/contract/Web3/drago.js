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

  instance = (address) => {
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

  buyDrago = (options) => {
    const instance = this._instance
    instance.options.from = options.from
    instance.methods.buyDrago().estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      instance.options.gas =  gasEstimate
    }
    )
    console.log(instance.options)
    return instance.methods.buyDrago()
      .send(options)
      .then((receipt) =>{ return console.log(receipt)})
      .catch((error) => {console.log(error)})
  }

  sellDrago = (options, values) => {
    const instance = this._instance
    console.log(options)
    console.log(instance.options)
    instance.options.from = options.from
    instance.methods.sellDrago(values[0]).estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      instance.options.gas =  gasEstimate
    }
    )
    console.log(instance.options)
    return instance.methods.sellDrago(values[0]).send(options).then((receipt) =>{ return console.log(receipt)}).catch((error) => {console.log(error)})
  }

  totalSupply =() =>{
    const instance = this._instance
    return instance.methods.totalSupply.call({})
  }
}

export default DragoWeb3;
