import { BigNumber } from 'bignumber.js'
import { GAS_ESTIMATE } from '../../constants'

const contractName = 'RigoToken'

describe(contractName, () => {
  const RIGOTOKEN = 'Rigo Token'
  const RIGOTOKEN_SYMBOL = 'GRG'
  const RIGOTOKEN_DECIMALS = 18
  describe('getName', () => {
    it('returns the contract name', async () => {
      const name = await baseContracts[contractName].getName()
      expect(name).toBe(RIGOTOKEN)
    })
  })
  describe('getSymbol', () => {
    it('returns the contract symbol', async () => {
      const symbol = await baseContracts[contractName].getSymbol()
      expect(symbol).toBe(RIGOTOKEN_SYMBOL)
    })
  })
  describe('getDecimals', () => {
    it("returns Rigo Token's decimals", async () => {
      const decimals = await baseContracts[contractName].getDecimals()
      expect(decimals).toEqual(new BigNumber(RIGOTOKEN_DECIMALS))
    })
  })
  describe('getMinter', () => {
    it('returns the address of the minter', async () => {
      const minter = await baseContracts[contractName].getMinter()
      expect(minter).toBe(accounts[0])
    })
  })
  describe('getRigoblock', () => {
    it('returns the address of Rigoblock DAO', async () => {
      const dao = await baseContracts[contractName].getRigoblock()
      expect(dao).toBe(accounts[0])
    })
  })
  // describe('getInflationFactor', () => {
  //   it('returns something', async () => {
  //     const inflactionFactor = await baseContracts[
  //       contractName
  //     ].getInflationFactor(baseContracts['VaultFactory'].address)
  //     console.log(inflactionFactor)
  //   })
  // })
  describe('mintToken', () => {
    it('mints new tokens and emits a TokenMinted event', async () => {
      const tokenAmount = 10
      const txHash = await baseContracts[contractName].mintToken(
        accounts[0],
        tokenAmount
      )
      const mintEvent = baseContracts[contractName].TokenMinted()
      const eventsPromise = new Promise((resolve, reject) => {
        mintEvent.get(
          (err, data) => (err ? reject(new Error(err)) : resolve(data))
        )
      })
      const events = await eventsPromise
      expect(txHash).toBeHash()
      expect(events.pop().args).toEqual({
        recipient: accounts[0],
        amount: new BigNumber(tokenAmount)
      })
    })
    it('can only be called by the minter', async () => {
      const tokenAmount = 10
      await expect(
        baseContracts[contractName].mintToken.sendTransactionAsync(
          accounts[1],
          tokenAmount,
          {
            // non minter account
            from: accounts[1],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })
  describe('changeMintingAddress', () => {
    it('sets a new minter given a valid account address', async () => {
      const txHash = await baseContracts[contractName].changeMintingAddress(
        accounts[1]
      )
      expect(txHash).toBeHash()
      const newMinter = await baseContracts[contractName].getMinter()
      expect(newMinter).toBe(accounts[1])
    })
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].changeMintingAddress.sendTransactionAsync(
          accounts[1],
          {
            // non DAO account
            from: accounts[1],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })
  describe('changeRigoblockAddress', () => {
    it('sets a new dao', async () => {
      const txHash = await baseContracts[contractName].changeRigoblockAddress(
        accounts[1]
      )
      expect(txHash).toBeHash()
      const newDao = await baseContracts[contractName].getRigoblock()
      expect(newDao).toBe(accounts[1])
    })
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].changeRigoblockAddress.sendTransactionAsync(
          accounts[1],
          {
            // non DAO account, we previously changed it
            from: accounts[0],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })
})
