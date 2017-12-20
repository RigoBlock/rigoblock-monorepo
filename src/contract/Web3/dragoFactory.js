// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../abi';
import Registry from '../registry';
import { toHex } from '../../Utils';
// import BigNumber from 'bignumber.js';
// import BigNumber from '../../../node_modules/bignumber.js';

class DragoFactoryWeb3 {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.dragofactory
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
    this._contractName = 'dragofactory'
  }

  get instance () {
    if (typeof this._instance === 'undefined') {
      throw new Error('The contract needs to be initialized.')
    }
    return this._instance;
  }

  get contract () {
    if (typeof this._contract === 'undefined') {
      throw new Error('The contract needs to be initialized.')
    }
    return this._contract;
  }

  get hexSignature() {
    return this._hexSignature
  }

  init = () => {
    const contractAbi = this._abi
    const api = this._api
    const contractName = this._contractName
    // this._instance = new api.eth.Contract(contractAbi, 'e0EA5C76FEB69C14AF9EAF3652849Ea069740ac4')
    return this._registry.instance(contractAbi, contractName)
      .then (contract => {
        this._instance = contract
        // // this._contract = contract
        // const hexSignature = this._contract._events.reduce((events, event) => {
        //   events[event._name] = toHex(event._signature)
        //   return events
        // }, {})
        // this._hexSignature = hexSignature
        return this._instance
      })
  }

  createDrago = (dragoName, dragoSymbol, accountAddress) => {
    if (!dragoName) {
      throw new Error('dragoName needs to be provided')
    }
    if (!dragoSymbol) {
      throw new Error('dragoSymbol needs to be provided')
    }
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    const instance = this._instance
    const values = [dragoName, dragoSymbol]
    const options = {
      from: accountAddress
    }
    console.log(values)
    console.log(options)
    instance.options.from = accountAddress
    // instance.methods.createDrago(dragoName, dragoSymbol).estimateGas(options)
    // .then(function(gasAmount){
    //   console.log(gasAmount)
    //   console.log('gas')
    //   var gasEstimateCorrect = 0
    //   // (gasEstimate) ? gasEstimateCorrect = 4600000 : gasEstimateCorrect = gasEstimate
    //   instance.options.gas =  gasEstimateCorrect
    // }
    // )
    // // instance.options.gas = 4600000
    instance.options.gas = "0x442168"
    return instance.methods.createDrago(dragoName, dragoSymbol)
      .send(options)
      .then((receipt) =>{ return console.log(receipt)})
      .catch((error) => {console.log(error)})


    // return instance.createDrago
    // .estimateGas(options, values)
    // .then((gasEstimate) => {
    //   options.gas = gasEstimate.mul(1.2).toFixed(0);
    //   return instance.createDrago.postTransaction(options, values)
    // })
    // .catch((error) => {
    //   console.error('error', error)
    // })
  }
}

export default DragoFactoryWeb3;
