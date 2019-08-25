import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'

import dragoArtifact from '../../artifacts/Drago.json'
import er20Artifact from '../../artifacts/ERC20.json'
import moment from 'moment'
import web3 from '../web3'

jest.setTimeout(30000);

const contractName = 'Drago'

describeContract(contractName, () => {
  let dragoAddress
  let dragoInstance
  let ethAddress
  let erc20Address
  let erc20Instance
  let transactionDefault
  let selfCustodyAddress
  let selfCustodyProxyAddress
  let selfCustodyAdapterAddress
  let grgTokenAddress

  beforeAll(async () => {
    await baseContracts['DragoFactory'].createDrago('my new drago', 'DRA')
    const [, dragoAddress] = await baseContracts['DragoRegistry'].fromName(
      'my new drago'
    )
    dragoInstance = new web3.eth.Contract(
      dragoArtifact.networks[GANACHE_NETWORK_ID].abi,
      dragoAddress
    )
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    selfCustodyProxyAddress = '0x0000000000000000000000000000000000000000'
    ethAddress = '0x0000000000000000000000000000000000000000'
    selfCustodyAddress = accounts[2]
    selfCustodyAdapterAddress = await baseContracts['ASelfCustody'].address
    await baseContracts['ExchangesAuthority'].setExchangeAdapter(
      selfCustodyProxyAddress,
      selfCustodyAdapterAddress
    )
    await baseContracts['ExchangesAuthority'].whitelistExchange(
      selfCustodyProxyAddress,
      true
    )
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
    grgTokenAddress = await baseContracts['RigoToken'].address
    await baseContracts['ExchangesAuthority'].setCasper(grgTokenAddress) // temporary patch, GRG = Casper
<<<<<<< HEAD
  })
=======
  }, 29999)
>>>>>>> fix-tests

  describe('operateOnExchange', () => {
    it('runs slow - sends ETH to a self custody wallet when operator holds enough GRG', async () => {
      // adds additional ether to the pool to be able to transfer
      const purchaseAmount = web3.utils.toWei('5.1')
      await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: purchaseAmount
      })

      const toBeTransferred = web3.utils.toWei('3.51') //web3.utils.toWei('1.1') //1e16 is 10 finney

      const methodInterface = {
        name: 'transferToSelfCustody',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'selfCustodyAccount'
          },
          {
            type: 'address',
            name: 'token'
          },
          {
            type: 'uint256',
            name: 'amount'
          }
        ]
      }
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        methodInterface,
        [selfCustodyAddress, ethAddress, toBeTransferred]
      )
      const methodSignature = await web3.eth.abi.encodeFunctionSignature(
        methodInterface
      )

      await baseContracts['ExchangesAuthority'].whitelistMethod(
        methodSignature,
        selfCustodyAdapterAddress,
        true
      ) // byte4(keccak256(method))

      const adapter = await baseContracts['ExchangesAuthority'].getExchangeAdapter(
        selfCustodyProxyAddress
      )
      const isMethodAllowed = await baseContracts['ExchangesAuthority'].isMethodAllowed(
        methodSignature,
        adapter
      )
      const preBalance = await web3.eth.getBalance(selfCustodyAddress)

      await dragoInstance.methods
        .operateOnExchange(selfCustodyProxyAddress, [assembledTransaction])
        .send({ ...transactionDefault })
      const postBalance = await web3.eth.getBalance(selfCustodyAddress)
      const targetBalance = postBalance - preBalance
      expect(targetBalance.toString()).toEqual(toBeTransferred.toString())
    })
    it('runs slow - succeeds but does not send ETH if operator not holding 1st threshold GRG', async () => {
      // adds additional ether to the pool to be able to transfer
      const purchaseAmount = web3.utils.toWei('5.1')
      await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: purchaseAmount
      })

      // transfer default account GRG balance to account 1
      const grgBalance = await baseContracts['RigoToken'].balanceOf(accounts[0])
      const grgDiff = grgBalance - web3.utils.toWei('95')
      await baseContracts['RigoToken'].transfer(accounts[1], grgDiff)

      // transfer an amount bigger than pi number
      const toBeTransferred = web3.utils.toWei('3.51') //web3.utils.toWei('1.1') //1e16 is 10 finney

      const methodInterface = {
        name: 'transferToSelfCustody',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'selfCustodyAccount'
          },
          {
            type: 'address',
            name: 'token'
          },
          {
            type: 'uint256',
            name: 'amount'
          }
        ]
      }
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        methodInterface,
        [selfCustodyAddress, ethAddress, toBeTransferred]
      )
      const methodSignature = await web3.eth.abi.encodeFunctionSignature(
        methodInterface
      )

      await baseContracts['ExchangesAuthority'].whitelistMethod(
        methodSignature,
        selfCustodyAdapterAddress,
        true
      ) // byte4(keccak256(method))

      const adapter = await baseContracts['ExchangesAuthority'].getExchangeAdapter(
        selfCustodyProxyAddress
      )
      const isMethodAllowed = await baseContracts['ExchangesAuthority'].isMethodAllowed(
        methodSignature,
        adapter
      )

      const preBalance = await web3.eth.getBalance(selfCustodyAddress)

      await dragoInstance.methods
        .operateOnExchange(selfCustodyProxyAddress, [assembledTransaction])
        .send({ ...transactionDefault })
      const postBalance = await web3.eth.getBalance(selfCustodyAddress)
      expect(postBalance.toString()).toEqual(preBalance.toString())
    })
    it('runs slow - succeeds bot does not send ETH if operator holding < 1st threshold GRG', async () => {
      // adds additional ether to the pool to be able to transfer
      const purchaseAmount = web3.utils.toWei('5.1')
      await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: purchaseAmount
      })

      // transfer default account GRG balance to account 1
      const grgBalance = await baseContracts['RigoToken'].balanceOf(accounts[0])
      await baseContracts['RigoToken'].transfer(accounts[1], grgBalance)

      // transfer an amount bigger than pi number
      const toBeTransferred = web3.utils.toWei('3.51') //web3.utils.toWei('1.1') //1e16 is 10 finney

      const methodInterface = {
        name: 'transferToSelfCustody',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'selfCustodyAccount'
          },
          {
            type: 'address',
            name: 'token'
          },
          {
            type: 'uint256',
            name: 'amount'
          }
        ]
      }
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        methodInterface,
        [selfCustodyAddress, ethAddress, toBeTransferred]
      )
      const methodSignature = await web3.eth.abi.encodeFunctionSignature(
        methodInterface
      )

      await baseContracts['ExchangesAuthority'].whitelistMethod(
        methodSignature,
        selfCustodyAdapterAddress,
        true
      ) // byte4(keccak256(method))

      const adapter = await baseContracts['ExchangesAuthority'].getExchangeAdapter(
        selfCustodyProxyAddress
      )
      const isMethodAllowed = await baseContracts['ExchangesAuthority'].isMethodAllowed(
        methodSignature,
        adapter
      )

      const preBalance = await web3.eth.getBalance(selfCustodyAddress)

      await dragoInstance.methods
        .operateOnExchange(selfCustodyProxyAddress, [assembledTransaction])
        .send({ ...transactionDefault })
      const postBalance = await web3.eth.getBalance(selfCustodyAddress)
      expect(postBalance.toString()).toEqual(preBalance.toString())
    })
    it.skip('sends a token to self custody', async () => {
      erc20Address = await baseContracts[
        'RigoToken'
      ].address
      erc20Instance = new web3.eth.Contract(
        erc20Artifact.networks[GANACHE_NETWORK_ID].abi,
        exchangeAddress
      )
    })
    it.skip('sends a token to self custody', async () => {
      erc20Address = await baseContracts[
        'RigoToken'
      ].address
      erc20Instance = new web3.eth.Contract(
        erc20Artifact.networks[GANACHE_NETWORK_ID].abi,
        exchangeAddress
      )
    })
  })
})
