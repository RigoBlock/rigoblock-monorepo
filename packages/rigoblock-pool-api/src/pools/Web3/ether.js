// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

class EtherWeb3 {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._constunctorName = this.constructor.name
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
    const options = {
      from: fromAddress,
      to: toAddress,
      value: amount
    }
    console.log(this._api)
    return this._api.eth.sendTransaction(options)
  }

}

export default EtherWeb3;
