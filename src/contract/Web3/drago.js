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
    console.log(options)
    console.log(instance.options)
    instance.options.from = options.from
    instance.methods.buyDrago().estimateGas(options)
    .then((gasEstimate) => {
      console.log(gasEstimate)
      instance.options.gas =  gasEstimate
    }
    )
    console.log(instance.options)
    return instance.methods.buyDrago().send(options).then((receipt) =>{ return console.log(receipt)}).catch((error) => {console.log(error)})
    // .then(() => {
    //   console.log(instance.options)
    //   const instance = instance.methods.buyDrago().send(options).then((receipt) =>{ return console.log(receipt)})
    //   console.log(instance)
    //   return instance.methods.buyDrago().send(options).then((receipt) =>{ return console.log(receipt)})
    // })


    // return instance.buyDrago
    // .estimateGas(options, values)
    // .then((gasEstimate) => {
    //   options.gas =  gasEstimate.mul(1.2).toFixed(0);
    //   console.log(`Buy drago: gas estimated as ${gasEstimate.toFixed(0)} setting to ${options.gas}`)
    //   // var dragoContractIstance = new web3.eth.Contract(abis.drago)
    //   // dragoContractIstance.options.from = this.state.account.address
    //   // dragoContractIstance.options.address = dragoDetails.address
    //   // dragoContractIstance.options.gas = options.gas
    //   // return dragoContractIstance.methods.buyDrago().send(options)
    //   // return eth.sendTransaction(options)
    //   return instance.buyDrago.postTransaction(options, values)
    // })
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
}

export default DragoWeb3;
