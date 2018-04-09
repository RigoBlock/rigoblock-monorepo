// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../../contracts/abi';
import Registry from '../registry';
import { VAULTFACTORY } from '../../utils/const'

class VaultFactoryWeb3 {
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

  get hexSignature() {
    return this._hexSignature
  }

  init = () => {
    const contractAbi = this._abi
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
    return instance.methods.createVault(vaultName, vaultSymbol).estimateGas(options)
      .then(function (gasAmount) {
        instance.options.gas = gasAmount
        return instance.methods.createVault(vaultName, vaultSymbol)
          .send(options)
          .then((receipt) => {
            return receipt
          })
      }
      )
  }
}

export default VaultFactoryWeb3;
