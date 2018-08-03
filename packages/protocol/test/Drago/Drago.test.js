import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import { fromMicro, fromWei, toBigNumber } from '../utils'
import dragoArtifact from '../../artifacts/Drago.json'
import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
  let dragoId
  let dragoAddress
  let dragoInstance
  let transactionDefault

  beforeAll(async () => {
    await baseContracts['DragoFactory'].createDrago('my new drago', 'DRA')
    const dragoData = await baseContracts['DragoRegistry'].fromName(
      'my new drago'
    )
    const [id, address] = dragoData
    const dragoId = id
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
  })

  describe('setTransactionFee', () => {
    it('sets the transaction fee', async () => {
      await dragoInstance.methods
        .setTransactionFee('2')
        .send({ ...transactionDefault })
      const adminData = await dragoInstance.methods
        .getAdminData().call()
      const newFee = adminData[4]
      expect(newFee).toEqual('2')
    })
    it('fails when non-owner tries to set the fee', async () => {
      const transactionParams = {
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      await expect (
        dragoInstance.methods
        .setTransactionFee('2')
        .send({ ...transactionParams })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
    it('fails when fee higher than one percent', async () => {
      await expect (
        dragoInstance.methods
        .setTransactionFee('101')
        .send({ ...transactionDefault })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('buyDrago', () => {
    it('creates new tokens', async () => {
      const purchaseAmount = web3.utils.toWei('1.1')
      const purchase = await dragoInstance.methods
        .buyDrago()
        .send({
          ...transactionDefault,
          value: purchaseAmount
        })
      const gasUsed = purchase.gasUsed
      const netPurchaseAmount = (purchaseAmount - gasUsed)
      const dragoData = await dragoInstance.methods
        .getData()
        .call()
      const buyPrice = dragoData[3]
      // the below will return an error, as the amount received by the pool is reduced by gas costs, which must be subtracted
      const decimals = 1e6
      const tokensAmount = await (netPurchaseAmount / buyPrice * decimals)
      const adminData = await dragoInstance.methods
        .getAdminData().call()
      const transactionFee = adminData[4]
      const ratio = adminData[3] //fee split ratio
      // the purchase fee is applied on the tokens
      const purchaseFee = tokensAmount * (transactionFee / 10000)
      // if the purchaser is also the wizard, 80% of the fee gets paid back
      const commission = purchaseFee * ratio / 100
      const netTokensAmount = (tokensAmount - purchaseFee + commission).toFixed(0)//.toString()
      const userBalance = await dragoInstance.methods
        .balanceOf(accounts[0]) //amend this if trying to buy from another account
        .call()
      expect(userBalance).toEqual(netTokensAmount)
    })
  })

  describe('wrapToEfx', () => {
    it('wraps eth to the efx wrapper', async () => {
      // adds additional ether to the pool to be able to deposit
      const purchaseAmount = web3.utils.toWei('1.1')
      const test = await dragoInstance.methods
        .buyDrago()
        .send({
          ...transactionDefault,
          value: purchaseAmount
        })
      const balance = await web3.eth.getBalance(dragoAddress)
      console.log(balance)
      const tokenAddress = null //Ether has address 0x0
      const tokenWrapper = await baseContracts['WrapperLockEth'].address
      const tokenTransferProxy = await baseContracts['TokenTransferProxy'].address
      const depositAmount = 1e16 // 10 finney
      const duration = 1 // 1 hour lockup (the minimum)
      // only whitelisters can whitelist exchanges
      await baseContracts['Authority'].setWhitelister(accounts[0], true)
      await baseContracts['Authority'].whitelistExchange(tokenWrapper, true)
      await baseContracts['Authority'].whitelistExchange(tokenTransferProxy, true)
      await dragoInstance.methods
        .wrapToEfx(
          tokenAddress,
          tokenWrapper,
          tokenTransferProxy,
          depositAmount,
          duration
        ).send({ ...transactionDefault })
      const wethBalance = await baseContracts['WrapperLockEth'].balanceOf(dragoAddress)
      // if a deposit is repeated, weth balance will be equal to the sum of depositAmouns
      expect(wethBalance.toString()).toEqual(depositAmount.toString())
    })
/*
    // must have a positive balance of token to wrap a token
    // a random token can be sent to a drago, won't be rejected. We may create a random token and transfer some tokens to the drago
    it('wraps a token to its efx wrapper', async () => {
    })
*/
  })
})
