// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../../contracts/abi'
import Registry from '../registry'
import { RIGOTOKEN_ADDRESSES } from '../../utils/const'

class RigoTokenParity {
  constructor(api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.rigotoken
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
  }

  get instance() {
    if (typeof this._instance === 'undefined') {
      throw new Error('The contract needs to be initialized.')
    }
    return this._instance
  }

  init = () => {
    const api = this._api
    const abi = this._abi
    const address = RIGOTOKEN_ADDRESSES[api._rb.network.id]
    this._instance = api.newContract(abi, address).instance
    return this._instance
  }

  balanceOf = accountAddress => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    const instance = this._instance
    return instance.balanceOf.call({}, [accountAddress])
  }

  transfer = (fromAddress, toAddress, amount) => {
    if (!fromAddress) {
      throw new Error('fromAddress needs to be provided')
    }
    if (!toAddress) {
      throw new Error('toAddress needs to be provided')
    }
    if (!amount) {
      throw new Error('amount needs to be provided')
    }
    const instance = this._instance
    const values = [toAddress, amount]
    const options = {
      from: fromAddress
    }
    return instance.transfer.estimateGas(options, values).then(gasEstimate => {
      options.gas = gasEstimate.mul(1.2).toFixed(0)
      console.log(
        `Transfer GRG: gas estimated as ${gasEstimate.toFixed(0)} setting to ${
          options.gas
        }`
      )
      return instance.transfer.postTransaction(options, values)
    })
  }
}

export default RigoTokenParity
