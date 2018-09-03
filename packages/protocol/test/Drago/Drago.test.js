import { BigNumber } from 'bignumber.js'
import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import dragoArtifact from '../../artifacts/Drago.json'

import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
  let dragoAddress
  let dragoInstance
  let transactionDefault
  let tokenTransferProxy
  let GRGtokenAddress

  beforeAll(async () => {
    await baseContracts['DragoFactory'].createDrago('my new drago', 'DRA')
    const dragoData = await baseContracts['DragoRegistry'].fromName(
      'my new drago'
    )
    const [, address] = dragoData
    dragoAddress = address
    dragoInstance = new web3.eth.Contract(
      dragoArtifact.networks[GANACHE_NETWORK_ID].abi,
      dragoAddress
    )
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    tokenTransferProxy = await baseContracts['TokenTransferProxy'].address
    GRGtokenAddress = await baseContracts['RigoToken'].address
    whitelister = await baseContracts['Authority'].setWhitelister(
      accounts[0],
      true
    )
  })

  describe('setTransactionFee', () => {
    it('sets the transaction fee', async () => {
      await dragoInstance.methods
        .setTransactionFee('2')
        .send({ ...transactionDefault })
      const adminData = await dragoInstance.methods.getAdminData().call()
      const newFee = adminData[4]
      expect(newFee).toEqual('2')
    })
    it('fails when non-owner tries to set the fee', async () => {
      const transactionParams = {
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      await expect(
        dragoInstance.methods
          .setTransactionFee('2')
          .send({ ...transactionParams })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
    it('fails when fee higher than one percent', async () => {
      await expect(
        dragoInstance.methods
          .setTransactionFee('101')
          .send({ ...transactionDefault })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setPrices', () => {
    it('sets the prices', async () => {
      const sellPrice = web3.utils.toWei('1.1')
      const buyPrice = web3.utils.toWei('1.11')
      const block = 1
      const hash = web3.utils.fromAscii('random')
      const data = web3.utils.fromAscii('random')
      await dragoInstance.methods
        .setPrices(sellPrice, buyPrice, block, hash, data)
        .send({ ...transactionDefault })
      const dragoData = await dragoInstance.methods.getData().call()
      const newSell = dragoData[2]
      expect(newSell).toEqual(sellPrice)
    })
  })

  describe('buyDrago', () => {
    it('creates new tokens', async () => {
      const purchaseAmount = web3.utils.toWei('0.1')
      const purchase = await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: purchaseAmount
      })
      const gasUsed = purchase.gasUsed
      const netPurchaseAmount = purchaseAmount - gasUsed
      const dragoData = await dragoInstance.methods.getData().call()
      const buyPrice = dragoData[3]
      const decimals = 1e6
      const tokensAmount = await ((netPurchaseAmount / buyPrice) * decimals)
      const adminData = await dragoInstance.methods.getAdminData().call()
      const transactionFee = adminData[4]
      const ratio = adminData[3] //fee split ratio
      // the purchase fee is applied on the tokens
      const purchaseFee = tokensAmount * (transactionFee / 10000)
      // if the purchaser is also the wizard, 80% of the fee gets paid back
      const commission = (purchaseFee * ratio) / 100
      const netTokensAmount = (tokensAmount - purchaseFee + commission).toFixed(
        0
      ) //.toString()
      const userBalance = await dragoInstance.methods
        .balanceOf(accounts[0]) //amend this if trying to buy from another account
        .call()
      expect(userBalance).toEqual(netTokensAmount)
    })
  })

  describe('setAllowance', () => {
    afterEach(async () => {
      // reset allowance to 0
      await baseContracts['ExchangesAuthority'].whitelistTokenTransferProxy(
        tokenTransferProxy,
        true
      )
      await dragoInstance.methods
        .setAllowance(tokenTransferProxy, GRGtokenAddress, 0)
        .send({ ...transactionDefault })
    })

    it('sets an infinite allowance to the tokentransferproxy', async () => {
      const infiniteAllowance = new BigNumber(2).pow(256).minus(1)
      await dragoInstance.methods
        .setAllowance(tokenTransferProxy, GRGtokenAddress, infiniteAllowance)
        .send({ ...transactionDefault })
      const allowance = await baseContracts['RigoToken'].allowance(
        dragoAddress,
        tokenTransferProxy
      )
      expect(allowance.toString()).toEqual(infiniteAllowance.toString())
    })
    it('sets an discretionary allowance to the tokentransferproxy', async () => {
      const discretionaryAllowance = 1000
      await dragoInstance.methods
        .setAllowance(
          tokenTransferProxy,
          GRGtokenAddress,
          discretionaryAllowance
        )
        .send({ ...transactionDefault })
      const allowance = await baseContracts['RigoToken'].allowance(
        dragoAddress,
        tokenTransferProxy
      )
      expect(allowance.toString()).toEqual(discretionaryAllowance.toString())
    })
    it('fails if non-owner tries to set allowance', async () => {
      const infiniteAllowance = new BigNumber(2).pow(256).minus(1)
      const transactionParams = {
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      await expect(
        dragoInstance.methods
          .setAllowance(tokenTransferProxy, GRGtokenAddress, infiniteAllowance)
          .send({ ...transactionParams })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
    it.skip('does not set allowance if proxy not whitelisted', async () => {
      //cannot blacklist proxy
      await baseContracts['ExchangesAuthority'].whitelistTokenTransferProxy(
        tokenTransferProxy,
        false
      )
      const infiniteAllowance = new BigNumber(2).pow(256).minus(1)
      await dragoInstance.methods
        .setAllowance(tokenTransferProxy, GRGtokenAddress, infiniteAllowance)
        .send({ ...transactionDefault })
      const allowance = await baseContracts['RigoToken'].allowance(
        dragoAddress,
        tokenTransferProxy
      )
      const zeroAllowance = 0
      expect(allowance.toString()).toEqual(zeroAllowance.toString())
    })
  })
})
