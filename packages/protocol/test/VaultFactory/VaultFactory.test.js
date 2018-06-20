const contractName = 'VaultFactory'

describeContracts(contractName, () => {
  describe('createVault', () => {
    it('creates a vault when provided with proper parameters', async () => {
      const txHash = await baseContracts[contractName].createVault(
        'test name',
        'NAM'
      )
      expect(txHash).toBeHash()
    })

    it('throws an error when provided with the same name', async () => {
      await baseContracts[contractName].createVault('same name', 'TE1')

      await expect(
        baseContracts[contractName].createVault('same name', 'TE2')
      ).rejects.toThrowErrorMatchingSnapshot()
    })

    it('does not throw an error when provided with the same symbol', async () => {
      const txHash1 = await baseContracts[contractName].createVault(
        'some name',
        'TTT'
      )
      const txHash2 = await baseContracts[contractName].createVault(
        'other name',
        'TTT'
      )
      expect(txHash1).toBeHash()
      expect(txHash2).toBeHash()
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
