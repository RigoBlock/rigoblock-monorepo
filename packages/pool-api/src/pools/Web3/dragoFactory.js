// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../../contracts/abi'
import Registry from '../registry'
import { DRAGOFACTORY } from '../../utils/const'

class DragoFactoryWeb3 {
  constructor(api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.dragofactory
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
    this._contractName = DRAGOFACTORY
  }

  get instance() {
    if (typeof this._instance === 'undefined') {
      throw new Error('The contract needs to be initialized.')
    }
    return this._instance
  }

  get hexSignature() {
    return this._hexSignature
  }

  init = () => {
    const contractAbi = this._abi
    const contractName = this._contractName
    return this._registry.instance(contractAbi, contractName).then(contract => {
      this._instance = contract
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
    const options = {
      from: accountAddress
    }
    instance.options.from = accountAddress
    return instance.methods
      .createDrago(dragoName, dragoSymbol)
      .estimateGas(options)
      .then(function(gasAmount) {
        instance.options.gas = gasAmount
        return instance.methods
          .createDrago(dragoName, dragoSymbol)
          .send(options)
          .then(receipt => {
            return receipt
          })
      })
  }
}

export default DragoFactoryWeb3
