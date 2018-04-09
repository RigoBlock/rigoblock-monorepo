// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../../contracts/abi';
import Registry from '../registry';
import { toHex } from '../../utils';
import { VAULTFACTORY } from '../../utils/const'

class VaultFactoryParity {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.vaultfactory
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
    this._contractName = VAULTFACTORY
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
    const contractName = this._contractName
    return this._registry.instance(contractAbi, contractName)
      .then (contract => {
        this._instance = contract.instance
        this._contract = contract
        const hexSignature = this._contract._events.reduce((events, event) => {
          events[event._name] = toHex(event._signature)
          return events
        }, {})
        this._hexSignature = hexSignature
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
    };
    const values = [vaultName, vaultSymbol, accountAddress]
    return instance.createVault
    .estimateGas(options, values)
    .then((gasEstimate) => {
      console.log(gasEstimate.toFormat())
      options.gas = gasEstimate.mul(1.2).toFixed(0);
      return instance.createVault.postTransaction(options, values)
    })
  }
}

export default VaultFactoryParity;
