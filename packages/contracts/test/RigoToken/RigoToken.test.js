import { GAS_ESTIMATE } from '../../constants'
import { toBigNumber } from '../utils'

const contractName = 'RigoToken'

describeContract(contractName, () => {
  const RIGOTOKEN = 'Rigo Token'
  const RIGOTOKEN_SYMBOL = 'GRG'
  const RIGOTOKEN_DECIMALS = 18
  let inflationAddress
  let transactionDefault

  beforeAll(() => {
    inflationAddress = baseContracts['Inflation'].address
    transactionDefault = {
      from: accounts[1],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
  })

  describe('mintToken', () => {
    afterAll(async () => {
      // reset minting address
      await baseContracts[contractName].changeMintingAddress(inflationAddress)
    })

    it('mints new tokens and emits a TokenMinted event', async () => {
      await baseContracts[contractName].changeMintingAddress(accounts[0])
      const tokenAmount = 10
      const txHash = await baseContracts[contractName].mintToken(
        accounts[0],
        tokenAmount
      )
      expect(txHash).toBeHash()
      const mintEvent = baseContracts[contractName].TokenMinted()
      const eventsPromise = new Promise((resolve, reject) => {
        mintEvent.get(
          (err, data) => (err ? reject(new Error(err)) : resolve(data))
        )
      })
      const events = await eventsPromise
      expect(events.length).toEqual(1)
      expect(events.pop().args).toEqual({
        recipient: accounts[0],
        amount: toBigNumber(tokenAmount)
      })
    })

    it('can only be called by the minter', async () => {
      const tokenAmount = 10
      await expect(
        baseContracts[contractName].mintToken.sendTransactionAsync(
          accounts[1],
          tokenAmount,
          transactionDefault
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('changeMintingAddress', () => {
    it('sets a new minter given a valid account address', async () => {
      const inflation = baseContracts['Inflation'].address
      const txHash = await baseContracts[contractName].changeMintingAddress(
        inflation
      )
      expect(txHash).toBeHash()
      const newMinter = await baseContracts[contractName].minter()
      expect(newMinter).toBe(inflation)
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
    afterAll(async () => {
      // reset the rigoblock DAO
      await baseContracts[
        contractName
      ].changeRigoblockAddress.sendTransactionAsync(accounts[0], {
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      })
    })

    it('sets a new dao', async () => {
      const txHash = await baseContracts[contractName].changeRigoblockAddress(
        accounts[1]
      )
      expect(txHash).toBeHash()
      const newDao = await baseContracts[contractName].rigoblock()
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

  describe('getName', () => {
    it('returns the contract name', async () => {
      const name = await baseContracts[contractName].name()
      expect(name).toBe(RIGOTOKEN)
    })
  })

  describe('getSymbol', () => {
    it('returns the contract symbol', async () => {
      const symbol = await baseContracts[contractName].symbol()
      expect(symbol).toBe(RIGOTOKEN_SYMBOL)
    })
  })

  describe('getDecimals', () => {
    it("returns Rigo Token's decimals", async () => {
      const decimals = await baseContracts[contractName].decimals()
      expect(decimals).toEqual(toBigNumber(RIGOTOKEN_DECIMALS))
    })
  })

  describe('getMinter', () => {
    it('returns the address of the minter', async () => {
      const minter = await baseContracts[contractName].minter()
      expect(minter).toBe(inflationAddress)
    })
  })

  describe('getRigoblock', () => {
    it('returns the address of Rigoblock DAO', async () => {
      const dao = await baseContracts[contractName].rigoblock()
      expect(dao).toBe(accounts[0])
    })
  })
})
