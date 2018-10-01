import api from './api'

class ContractFactory {
  constructor() {
    this.contractInstances = {}
  }

  getInstance(name, address = api.contract[name].address) {
    return this.contractInstances[name] && this.contractInstances[name][address]
      ? Promise.resolve(this.contractInstances[name][address])
      : this.createInstance(name, address)
  }

  async createInstance(name, address = api.contract[name].address) {
    console.log(this.contractInstances)
    console.log('Called Create: ', name, address)
    this.contractInstances[name] = this.contractInstances[name] || {}
    this.contractInstances[name][address] = api.contract[
      name
    ].createAndValidate(api.web3, address)
    return await this.contractInstances[name][address]
  }
}

export default new ContractFactory()
