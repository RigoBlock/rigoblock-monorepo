const contractName = 'VaultFactory'

describe(contractName, () => {
  // const getContract = (contractName = 'VaultFactory', options = {}) => {
  //   return new web3.eth.Contract(contractsMap[contractName].abi, options, {
  //     data: contractsMap[contractName].bytecode
  //   })
  // }
  describe('createVault', () => {
    it('creates a vault when provided with proper parameters', async () => {
      const vaultAddress = await baseContracts[contractName].createVault(
        'test name',
        'NAM'
      )
      expect(vaultAddress).toBeHash()
    })

    it('throws an error when provided with the same name', async () => {
      await baseContracts[contractName].createVault('same name', 'TE1')

      await expect(
        baseContracts[contractName].createVault('same name', 'TE2')
      ).rejects.toThrowErrorMatchingSnapshot()
    })

    it('does not throw an error when provided with the same symbol', async () => {
      const addr1 = await baseContracts[contractName].createVault(
        'some name',
        'TTT'
      )
      const addr2 = await baseContracts[contractName].createVault(
        'other name',
        'TTT'
      )
      expect(addr1).toBeHash()
      expect(addr2).toBeHash()
    })

    it('throws an exception when provided with a symbol longer than 3 characters', async () => {
      await expect(
        baseContracts[contractName].createVault('long one', 'TOOLONG')
      ).rejects.toThrowErrorMatchingSnapshot()
    })

    it('throws an exception when provided with a symbol longer smaller than 3 characters', async () => {
      await expect(
        baseContracts[contractName].createVault('small one', 'SM')
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })
})
