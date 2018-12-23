import { BigNumber } from 'bignumber.js'

let genericToken
let totalSupply = 1000000000000000000000000

const contractName = 'ERC20Generic1'

describeContract(contractName, () => {
  beforeAll(async () => {
    genericToken = baseContracts['ERC20Generic1']
  })

  describe('ERC20 generic tokens', () => {
    it('Correctly sets initial balance, name, symbol and decimals', async () => {
      let tokenBalance, tokenName, tokenSymbol, tokenDecimals

      tokenBalance = await genericToken.balanceOf(accounts[0])
      expect(new BigNumber(tokenBalance).toFixed()).toBe(
        new BigNumber(totalSupply).toFixed()
      )

      tokenName = await genericToken.name()
      expect(new BigNumber(tokenName).toFixed()).toBe(
        new BigNumber('Token 1 18 decimals').toFixed()
      )

      tokenSymbol = await genericToken.symbol()
      expect(new BigNumber(tokenSymbol).toFixed()).toBe(
        new BigNumber('TK1').toFixed()
      )

      tokenDecimals = await genericToken.decimals()
      expect(new BigNumber(tokenDecimals).toFixed()).toBe(
        new BigNumber(18).toFixed()
      )
    })
    it('Correctly transfers tokens', async () => {
      let tokenBalance

      await genericToken.transfer.sendTransactionAsync(accounts[1], 100, {
        from: accounts[0]
      })
      tokenBalance = await genericToken.balanceOf(accounts[1])
      expect(new BigNumber(tokenBalance).toFixed()).toBe(
        new BigNumber(100).toFixed()
      )
      tokenBalance = await genericToken.balanceOf(accounts[0])
      expect(new BigNumber(tokenBalance).toFixed()).toBe(
        new BigNumber(totalSupply).minus(100).toFixed()
      )

      await genericToken.transfer.sendTransactionAsync(accounts[2], 10, {
        from: accounts[1]
      })
      tokenBalance = await genericToken.balanceOf(accounts[1])
      expect(new BigNumber(tokenBalance).toFixed()).toBe(
        new BigNumber(90).toFixed()
      )

      tokenBalance = await genericToken.balanceOf(accounts[2])
      expect(new BigNumber(tokenBalance).toFixed()).toBe(
        new BigNumber(10).toFixed()
      )
    })

    it('Correctly approves and transfers tokens', async () => {
      let tokenBalance

      await genericToken.approve.sendTransactionAsync(accounts[1], 100, {
        from: accounts[0]
      })
      await genericToken.transferFrom.sendTransactionAsync(
        accounts[0],
        accounts[3],
        10,
        {
          from: accounts[1]
        }
      )

      tokenBalance = await genericToken.balanceOf(accounts[3])
      expect(new BigNumber(tokenBalance).toFixed()).toBe(
        new BigNumber(10).toFixed()
      )
    })
  })
})
