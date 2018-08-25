import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import { fromMicro, fromWei, toBigNumber } from '../utils'
import dragoArtifact from '../../artifacts/Drago.json'
import { BigNumber } from 'bignumber.js'

import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
  let dragoId
  let dragoAddress
  let dragoInstance
  let transactionDefault
  let tokenTransferProxy
  let GRGtokenAddress
  let whitelister

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
    tokenTransferProxy = await baseContracts['TokenTransferProxy'].address
    GRGtokenAddress = await baseContracts['RigoToken'].address
    whitelister = await baseContracts['Authority'].setWhitelister(accounts[0], true)
  })

  describe('operateOnExchange', () => {
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
      const tokenAddress = null //Ether has address 0x0
      const tokenWrapper = await baseContracts['WrapperLockEth'].address
      const tokenTransferProxy = await baseContracts['TokenTransferProxy'].address
      const toBeWrapped = 1e16 // 10 finney
      const time = 1 // 1 hour lockup (the minimum)
      // only whitelisters can whitelist exchanges
      await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
      await baseContracts['ExchangesAuthority'].whitelistWrapper(tokenWrapper, true)
      await baseContracts['ExchangesAuthority'].whitelistAssetOnExchange(
        tokenAddress,
        tokenWrapper,
        true
      )
      const methodInterface = {
        name: 'wrapToEfx',
        type: 'function',
        inputs: [{
          type: 'address',
          name: '_token'
        },{
          type: 'address',
          name: '_wrapper'
        },{
          type: 'uint256',
          name: '_value'
        },{
          type: 'uint256',
          name: '_forTime'
        }]
      }
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        methodInterface,
        [tokenAddress, tokenWrapper, toBeWrapped, time]
      )
      const methodSignature = await web3.eth.abi.encodeFunctionSignature(methodInterface)
      const ethfinexAddress = await baseContracts['AEthfinex'].address
      await baseContracts['ExchangesAuthority'].whitelistMethod(methodSignature, ethfinexAddress, true) // byte4(keccak256(method))
      const isWhite = await baseContracts['ExchangesAuthority'].isMethodAllowed(methodSignature, ethfinexAddress)
      console.log(isWhite)
      await dragoInstance.methods
        .operateOnExchange(
          ethfinexAddress,
          assembledTransaction
        )
        .send({ ...transactionDefault })
      const wethBalance = await baseContracts['WrapperLockEth'].balanceOf(dragoAddress)
      // if a deposit is repeated, weth balance will be equal to the sum of depositAmouns
      expect(wethBalance.toString()).toEqual(depositAmount.toString())
    })
    it.skip('wraps some GRG tokens to its efx token wrapper', async () => {
      // self-mint the base token first and transfer some of it to drago (drago cannot reject, tokens cannot be claimed back (only eth redemptions))
      const GRGtokensAmount = web3.utils.toWei('101')
      await baseContracts['RigoToken'].transfer(dragoAddress, GRGtokensAmount)
      // we now need to set the allowance to the GRG wrapper
      const GRGwrapperAddress = await baseContracts['WrapperLock'].address
      await baseContracts['Authority'].whitelistExchange(GRGwrapperAddress, true)
      await dragoInstance.methods
        .setInfiniteAllowance(
          GRGwrapperAddress,
          GRGtokenAddress
        )
        .send({ ...transactionDefault })
      const tokensInDrago = await baseContracts['RigoToken'].balanceOf(dragoAddress)
      expect(GRGtokensAmount).toEqual(tokensInDrago.toString())
      const depositAmount = web3.utils.toWei('10')
      const duration = 1 // minimum duration 1 hour. // TODO for testing purposes, amend the parameter to seconds in the wrapper contract
      await baseContracts['Authority'].setExchangeAdapter(GRGwrapperAddress, GRGwrapperAddress)
      await baseContracts['Authority'].whitelistExchange(tokenTransferProxy, true)
      //whitelist method
      await dragoInstance.methods
        .wrapToEfx(
          GRGtokenAddress,
          GRGwrapperAddress,
          tokenTransferProxy,
          depositAmount,
          duration
        ).send({ ...transactionDefault })
      //const c = await baseContracts['WrapperLock'].balanceOf(dragoAddress)
      //console.log(c.toString())

      const toBeWrapped = 200000
      const time = 1 // 1 hour
      const assembledTransaction2 = await web3.eth.abi.encodeFunctionCall(
        {
          name: 'wrapToEfx',
          type: 'function',
          inputs: [{
            type: 'address',
            name: '_token'
          },{
            type: 'address',
            name: '_wrapper'
          },{
            type: 'uint256',
            name: '_value'
          },{
            type: 'uint256',
            name: '_forTime'
          }]
        }, [toBeWrapped, time]
      )
      const ethfinexAddress = await baseContracts['AEthfinex'].address
      await dragoInstance.methods
        .operateOnExchange(
          ethfinexAddress,
          assembledTransaction2
        ).send({ ...transactionDefault }) // commented to sending from depositToEfx
      const wrappedTokensAmount = await baseContracts['WrapperLock'].balanceOf(dragoAddress)
      //expect(wrappedTokensAmount.toString()).toEqual(toBeWrapped.toString()) // this test is not true if run together with previous wrap call
    })
  })

  //rather than implementing in drago.sol, we use operateOnExchangeDirectly(address _exchange, bytes _assembledTransaction)
  //const assembledTransaction = await baseContracts['RigoToken'].approve(tokenTransferProxy, 0).encodeABI()
  // TODO: must implement separate set allowance (0) function in drago.sol, it's twisted to have token approved as exchange
  describe.skip('operateOnExchangeDirectly', () => {
    /*afterAll(async () => {
      // reset allowance to 0 // need allowance to debugging
      const tokenTransferProxy = await baseContracts['TokenTransferProxy'].address
      const GRGtokenAddress = await baseContracts['RigoToken'].address
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        {
          name: 'approve',
          type: 'function',
          inputs: [{
            type: 'address',
            name: '_spender'
          },{
            type: 'uint256',
            name: '_value'
          }]
        }, [tokenTransferProxy, 0]
      )
      await dragoInstance.methods
        .operateOnExchangeDirectly(
          GRGtokenAddress,
          assembledTransaction
        ).send({ ...transactionDefault })
    })*/

    it('does not execute when withdraws the wrapped eth before expiry', async () => {
      // it is expected to fail unless locuup time (1 hour minimum default) is passed
      // make sure some eth was wrapped before
      const wrappedTokensAmount = await baseContracts['WrapperLockEth'].balanceOf(dragoAddress)
      //console.log(wrappedTokensAmount.toString())
      const wrapperAddress = await baseContracts['WrapperLockEth'].address
      await baseContracts['Authority'].whitelistExchange(wrapperAddress, true)
      const a = '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock bytes
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        {
          name: 'withdraw',
          type: 'function',
          inputs: [{
            type: 'uint8',
            name: 'v'
          },{
            type: 'bytes32',
            name: 'r'
          },{
            type: 'bytes32',
            name: 's'
          },{
            type: 'uint256',
            name: '_value'
          },{
            type: 'uint256',
            name: 'signatureValidUntilBlock'
          }]
        }, [0, a, a, 1000, 0]
      )
      await dragoInstance.methods
        .operateOnExchangeDirectly(
          wrapperAddress,
          assembledTransaction
        ).send({ ...transactionDefault })
      //const unwrappedTokens = await baseContracts['WrapperLockEth'].balanceOf(dragoAddress)
      //console.log(unwrappedTokens.toString())
      // the function does not return an error, but fails
    })
    it('executes a failing deposit and verifies that allowance is 0 if deposit fails', async () => {
      // TODO // make sure that if by any change deposit(params) fails, allowance is 0
      // we have to use the encodeABI api, as the remove allowance function is not implemented in the drago
    })
    // TODO: one can call any function of a token if the token is whitelisted as an exchange, allowances should be treated differently
    it('sets an infinite allowance for a drago', async () => {
      // first we whitelist the GRG token
      await baseContracts['Authority'].whitelistExchange(GRGtokenAddress, true)
      // then we set the adapter to the token itself
      await baseContracts['Authority'].setExchangeAdapter(GRGtokenAddress, GRGtokenAddress) // this will be removed
      // then we must set the allowance
      const infiniteAllowance = new BigNumber(2).pow(256).minus(1)
      // TODO: must implement separate set allowance (0) function in drago.sol, it's twisted to have token approved as exchange
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        {
          name: 'approve',
          type: 'function',
          inputs: [{
            type: 'address',
            name: '_spender'
          },{
            type: 'uint256',
            name: '_value'
          }]
        }, [tokenTransferProxy, infiniteAllowance]
      )
      await dragoInstance.methods
        .operateOnExchangeDirectly(
          GRGtokenAddress,
          assembledTransaction
        ).send({ ...transactionDefault })
      const allowance = await baseContracts['RigoToken'].allowance(dragoAddress, tokenTransferProxy)
      expect(infiniteAllowance.toString()).toEqual(allowance.toString())
    })
    it('deposits GRGs to the efx token wrapper', async () => {
      // first we must send some GRGs to the drago
      const GRGtokensAmount = web3.utils.toWei('101')
      await baseContracts['RigoToken'].transfer(dragoAddress, GRGtokensAmount)
      // then we must set the allowance to the token wrapper
      const infiniteAllowance = new BigNumber(2).pow(256).minus(1)
      // TODO: must implement separate set allowance (0) function in drago.sol, it's twisted to have token approved as exchange
      const wrapperAddress = await baseContracts['WrapperLock'].address
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        {
          name: 'approve',
          type: 'function',
          inputs: [{
            type: 'address',
            name: '_spender'
          },{
            type: 'uint256',
            name: '_value'
          }]
        }, [wrapperAddress, infiniteAllowance]
      )
      await dragoInstance.methods
        .operateOnExchangeDirectly(
          GRGtokenAddress,
          assembledTransaction
        ).send({ ...transactionDefault })
      //const allowance = await baseContracts['RigoToken'].allowance(dragoAddress, wrapperAddress)
      await baseContracts['Authority'].whitelistExchange(wrapperAddress, true)
      await baseContracts['Authority'].setExchangeAdapter(wrapperAddress, wrapperAddress)
      const toBeWrapped = 200000
      const time = 1 // 1 hour
      const assembledTransaction2 = await web3.eth.abi.encodeFunctionCall(
        {
          name: 'deposit',
          type: 'function',
          inputs: [{
            type: 'uint256',
            name: '_value'
          },{
            type: 'uint256',
            name: '_forTime'
          }]
        }, [toBeWrapped, time]
      )
      await dragoInstance.methods
        .operateOnExchangeDirectly(
          wrapperAddress,
          assembledTransaction2
        ).send({ ...transactionDefault }) // commented to sending from depositToEfx
      const wrappedTokensAmount = await baseContracts['WrapperLock'].balanceOf(dragoAddress)
      //expect(wrappedTokensAmount.toString()).toEqual(toBeWrapped.toString()) // this test is not true if run together with previous wrap call
    })
  })
})
