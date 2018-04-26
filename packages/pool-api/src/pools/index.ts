class Contract {
  // TODO add correct types
  Authority: any
  DragoEventfulority: any
  DragoFactory: any
  DragoRegistry: any
  VaultEventful: any
  VaultFactory: any
  constructor(web3: object, contractsMap: object) {
    if (!web3) {
      throw new Error('web3 instance needs to be provided to Contract')
    }
    const deployedContracts: Array<string> = Object.keys(contractsMap).filter(
      contractName => contractsMap[contractName].address
    )

    deployedContracts.forEach(async contractName => {
      const contract: object = await import(`./contracts/${contractName}`)
      this[`_${contractName}`] = new contract[contractName](
        web3,
        contractsMap[contractName].address
      )

      Object.defineProperty(this, contractName, {
        get: () => this[`_${contractName}`]
      })
    })
  }
}

export default Contract
