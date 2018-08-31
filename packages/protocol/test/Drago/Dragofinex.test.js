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
  let ethfinexAddress
  let ethfinexAdapterAddress

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
    ethfinexAddress = await baseContracts['ExchangeEfx'].address
    ethfinexAdapterAddress = await baseContracts['ExchangesAuthority'].getExchangeAdapter(ethfinexAddress)
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
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
      const toBeWrapped = 1e16 // 10 finney
      const time = 1 // 1 hour lockup (the minimum)

      await baseContracts['ExchangesAuthority'].whitelistWrapper(tokenWrapper, true)
      await baseContracts['ExchangesAuthority'].whitelistAssetOnExchange(
        tokenAddress,
        tokenWrapper,
        true
      )
      //const isTrue = await baseContracts['AEthfinex'].isApprovedWrapper(tokenWrapper)
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
      const sigFromData = await dragoInstance.methods.findMethod(assembledTransaction).call()
      await baseContracts['ExchangesAuthority'].whitelistMethod(methodSignature, ethfinexAdapterAddress, true) // byte4(keccak256(method))
      //const isApprovedMethod = await baseContracts['ExchangesAuthority'].isMethodAllowed(methodSignature, ethfinexAdapterAddress)

      await dragoInstance.methods
        .operateOnExchange(
          ethfinexAddress,
          assembledTransaction
        )
        .send({ ...transactionDefault })
      const wethBalance = await baseContracts['WrapperLockEth'].balanceOf(dragoAddress)
      // if a deposit is repeated, weth balance will be equal to the sum of depositAmouns
      expect(wethBalance.toString()).toEqual(toBeWrapped.toString())
    })
    it('wraps some GRG tokens to its efx token wrapper', async () => {
      // self-mint the base token first and transfer some of it to drago (drago cannot reject, tokens cannot be claimed back (only eth redemptions))
      const GRGtokensAmount = web3.utils.toWei('101')
      await baseContracts['RigoToken'].transfer(dragoAddress, GRGtokensAmount)

      const tokensInDrago = await baseContracts['RigoToken'].balanceOf(dragoAddress)
      expect(GRGtokensAmount).toEqual(tokensInDrago.toString())

      const tokenAddress = await baseContracts['RigoToken'].address
      const tokenWrapper = await baseContracts['WrapperLock'].address
      const toBeWrapped = web3.utils.toWei('10') // alt 200000
      const time = 1 // minimum duration 1 hour.

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
      await baseContracts['ExchangesAuthority'].whitelistMethod(methodSignature, ethfinexAdapterAddress, true) // byte4(keccak256(method))
      await dragoInstance.methods
        .operateOnExchange(
          ethfinexAddress,
          assembledTransaction
        ).send({ ...transactionDefault })
      const wrappedTokensAmount = await baseContracts['WrapperLock'].balanceOf(dragoAddress) //(dragoAddress)
      expect(wrappedTokensAmount.toString()).toEqual(toBeWrapped.toString())
    })
  })

  //rather than implementing in drago.sol, we use operateOnExchangeDirectly(address _exchange, bytes _assembledTransaction)
  //const assembledTransaction = await baseContracts['RigoToken'].approve(tokenTransferProxy, 0).encodeABI()
  describe.skip('operateOnExchange2', () => {
    it('does not execute when withdraws the wrapped eth before expiry', async () => {
      // it is expected to fail unless locuup time (1 hour minimum default) is passed
      // make sure some eth was wrapped before
      const wrappedTokensAmount = await baseContracts['WrapperLockEth'].balanceOf(dragoAddress)
      //console.log(wrappedTokensAmount.toString())
      const wrapperAddress = await baseContracts['WrapperLockEth'].address
      await baseContracts['ExchangesAuthority'].whitelistExchange(wrapperAddress, true)
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
  })
})
