// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../../contracts/abi'
import Registry from '../registry'
import { DRAGOREGISTRY } from '../../utils/const'

class DragoRegistryParity {
  constructor(api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.dragoregistry
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
    this._contractName = DRAGOREGISTRY
  }

  get instance() {
    if (typeof this._instance === 'undefined') {
      throw new Error('The contract needs to be initialized.')
    }
    return this._instance
  }

  get contract() {
    if (typeof this._contract === 'undefined') {
      throw new Error('The contract needs to be initialized.')
    }
    return this._contract
  }

  init = () => {
    const contractAbi = this._abi
    const contractName = this._contractName
    console.log(contractName)
    return this._registry.instance(contractAbi, contractName).then(contract => {
      this._instance = contract.instance
      this._contract = contract
      return contract
    })
  }

  fromId = dragoID => {
    if (!dragoID) {
      throw new Error('DragoID needs to be provided to drago')
    }
    const instance = this._instance
    return Promise.all([instance.fromId.call({}, [dragoID])])
  }

  fromAddress = dragoAddress => {
    if (!dragoAddress) {
      throw new Error(
        `dragoAddress needs to be provided to ${arguments.callee.toString()}`
      )
    }
    const instance = this._instance
    return instance.fromAddress.call({}, [dragoAddress])
  }
}

export default DragoRegistryParity
