const contractName = 'WETH9'

describeContract(contractName, () => {
  describe('deposit', () => {
    it('wraps some ETH', async () => {
      // wrap eth and send to mock handler
      const ethToWrap = 48333317481
      await baseContracts['WETH9'].deposit({
        value: ethToWrap,
        from: accounts[0]
      })
      await baseContracts['WETH9'].transfer(accounts[1], 48333317481)
      const secondaryBalance = await baseContracts['WETH9'].balanceOf(
        accounts[1]
      )
      expect(secondaryBalance.toString()).toEqual(ethToWrap.toString())
    })
  })
})
