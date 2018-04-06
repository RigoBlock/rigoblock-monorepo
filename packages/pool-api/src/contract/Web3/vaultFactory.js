// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../abi';
import Registry from '../registry';
import { toHex } from '../../Utils';


class DragoFactoryWeb3 {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.vaultfactory
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
    this._contractName = 'gabcoinfactory'
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
    return this._registry.instance(contractAbi, contractName)
      .then (contract => {
        this._instance = contract
        return this._instance
      })
  }

  createVault = (vaultName, vaultSymbol, accountAddress) => {
    if (!vaultName) {
      throw new Error('vaultName needs to be provided')
    }
    if (!vaultSymbol) {
      throw new Error('vaultSymbol needs to be provided')
    }
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    const instance = this._instance
    const options = {
      from: accountAddress
    }
    console.log(options)
    instance.options.from = accountAddress
    // instance.methods.createDrago(vaultName, vaultSymbol).estimateGas(options)
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
    return instance.methods.createGabcoin(vaultName, vaultSymbol)
      .send(options)
      .then((receipt) =>{
        console.log(receipt)
        return receipt
      })
      .catch((error) => {
        console.log(error)
        return error
      })


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
