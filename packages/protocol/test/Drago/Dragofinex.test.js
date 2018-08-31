import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import dragoArtifact from '../../artifacts/Drago.json'

import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
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
    ethfinexAddress = await baseContracts['ExchangeEfx'].address
    ethfinexAdapterAddress = await baseContracts[
      'ExchangesAuthority'
    ].getExchangeAdapter(ethfinexAddress)
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
  })

  describe('operateOnExchange', () => {
    it('wraps eth to the efx wrapper', async () => {
      // adds additional ether to the pool to be able to deposit
      const purchaseAmount = web3.utils.toWei('1.1')
      await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: purchaseAmount
      })
      await web3.eth.getBalance(dragoAddress)

      const tokenAddress = null //Ether has address 0x0
      const tokenWrapper = await baseContracts['WrapperLockEth'].address
      const toBeWrapped = 1e16 // 10 finney

      // unused vars
      // const time = 1 // 1 hour lockup (the minimum)
      // const isOld = 0 // is a standard ERC20

      await baseContracts['ExchangesAuthority'].whitelistWrapper(
        tokenWrapper,
        true
      )
      await baseContracts['ExchangesAuthority'].whitelistTokenOnWrapper(
        tokenAddress,
        tokenWrapper,
        true
      )
      //const isTrue = await baseContracts['AEthfinex'].isApprovedWrapper(tokenWrapper)
      const methodInterface = {
        name: 'wrapToEfx',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'token'
          },
          {
            type: 'address',
            name: 'wrapper'
          },
          {
            name: 'value'
          },
          {
            type: 'uint256',
            name: 'forTime'
          },
          {
            type: 'bool',
            name: 'erc20Old'
          }
        ]
      }
      const methodSignature = await web3.eth.abi.encodeFunctionSignature(
        methodInterface
      )
      await dragoInstance.methods.findMethod(assembledTransaction).call()
      await baseContracts['ExchangesAuthority'].whitelistMethod(
        methodSignature,
        ethfinexAdapterAddress,
        true
      ) // byte4(keccak256(method))
      //const isApprovedMethod = await baseContracts['ExchangesAuthority'].isMethodAllowed(methodSignature, ethfinexAdapterAddress)

      await dragoInstance.methods
        .operateOnExchange(ethfinexAddress, assembledTransaction)
        .send({ ...transactionDefault })
      const wethBalance = await baseContracts['WrapperLockEth'].balanceOf(
        dragoAddress
      )
      // if a deposit is repeated, weth balance will be equal to the sum of depositAmouns
      expect(wethBalance.toString()).toEqual(toBeWrapped.toString())
    })
    it('wraps some GRG tokens to its efx token wrapper', async () => {
      // self-mint the base token first and transfer some of it to drago (drago cannot reject, tokens cannot be claimed back (only eth redemptions))
      const GRGtokensAmount = web3.utils.toWei('101')
      await baseContracts['RigoToken'].transfer(dragoAddress, GRGtokensAmount)

      const tokensInDrago = await baseContracts['RigoToken'].balanceOf(
        dragoAddress
      )
      expect(GRGtokensAmount).toEqual(tokensInDrago.toString())

      const tokenAddress = await baseContracts['RigoToken'].address
      const tokenWrapper = await baseContracts['WrapperLock'].address
      const toBeWrapped = web3.utils.toWei('10') // alt 200000
      const time = 1 // minimum duration 1 hour.
      const isOld = 0 // is a standard ERC20 token

      await baseContracts['ExchangesAuthority'].whitelistWrapper(
        tokenWrapper,
        true
      )
      await baseContracts['ExchangesAuthority'].whitelistTokenOnWrapper(
        tokenAddress,
        tokenWrapper,
        true
      )

      const methodInterface = {
        name: 'wrapToEfx',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: '_token'
          },
          {
            type: 'address',
            name: '_wrapper'
          },
          {
            type: 'uint256',
            name: '_value'
          },
          {
            type: 'uint256',
            name: '_forTime'
          },
          {
            type: 'bool',
            name: 'erc20Old'
          }
        ]
      }
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        methodInterface,
        [tokenAddress, tokenWrapper, toBeWrapped, time, isOld]
      )
      const methodSignature = await web3.eth.abi.encodeFunctionSignature(
        methodInterface
      )
      await baseContracts['ExchangesAuthority'].whitelistMethod(
        methodSignature,
        ethfinexAdapterAddress,
        true
      ) // byte4(keccak256(method))
      await dragoInstance.methods
        .operateOnExchange(ethfinexAddress, assembledTransaction)
        .send({ ...transactionDefault })
      const wrappedTokensAmount = await baseContracts['WrapperLock'].balanceOf(
        dragoAddress
      ) //(dragoAddress)
      expect(wrappedTokensAmount.toString()).toEqual(toBeWrapped.toString())
    })
  })

  it('withdraws some GRGs from its token wrapper', async () => {
    // wrap some tokens first
    const GRGtokensAmount = web3.utils.toWei('101')
    await baseContracts['RigoToken'].transfer(dragoAddress, GRGtokensAmount)

    const tokenAddress = await baseContracts['RigoToken'].address
    const tokenWrapper = await baseContracts['WrapperLock'].address
    const toBeWrapped = web3.utils.toWei('10') // alt 200000
    const time = 1 // minimum duration 1 hour.
    const isOld = 0 // is a standard ERC20 token

    await baseContracts['ExchangesAuthority'].whitelistWrapper(
      tokenWrapper,
      true
    )
    await baseContracts['ExchangesAuthority'].whitelistTokenOnWrapper(
      tokenAddress,
      tokenWrapper,
      true
    )

    const methodInterface = {
      name: 'wrapToEfx',
      type: 'function',
      inputs: [
        {
          type: 'address',
          name: '_token'
        },
        {
          type: 'address',
          name: '_wrapper'
        },
        {
          type: 'uint256',
          name: '_value'
        },
        {
          type: 'uint256',
          name: '_forTime'
        },
        {
          type: 'bool',
          name: 'erc20Old'
        }
      ]
    }
    const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
      methodInterface,
      [tokenAddress, tokenWrapper, toBeWrapped, time, isOld]
    )
    const methodSignature = await web3.eth.abi.encodeFunctionSignature(
      methodInterface
    )
    await baseContracts['ExchangesAuthority'].whitelistMethod(
      methodSignature,
      ethfinexAdapterAddress,
      true
    ) // byte4(keccak256(method))
    await dragoInstance.methods
      .operateOnExchange(ethfinexAddress, assembledTransaction)
      .send({ ...transactionDefault })

    // double check the drago has a positive balance of wrapped tokens
    await baseContracts['WrapperLock'].balanceOf(dragoAddress)
    //console.log(wrappedTokens.toString())

    // we now may unwrap
    const amountToWithdraw = 123
    const v = 1
    const r =
      '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock bytes32
    const s =
      '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock bytes32
    const validUntil = 1

    const methodInterface2 = {
      name: 'unwrap',
      type: 'function',
      inputs: [
        {
          type: 'address',
          name: 'token'
        },
        {
          type: 'address',
          name: 'wrapper'
        },
        {
          type: 'uint256',
          name: 'value'
        },
        {
          type: 'uint8',
          name: 'v'
        },
        {
          type: 'bytes32',
          name: 'r'
        },
        {
          type: 'bytes32',
          name: 's'
        },
        {
          type: 'uint256',
          name: 'signatureValidUntilBlock'
        }
      ]
    }
    const assembledTransaction2 = await web3.eth.abi.encodeFunctionCall(
      methodInterface2,
      [tokenAddress, tokenWrapper, amountToWithdraw, v, r, s, validUntil]
    )
    const methodSignature2 = await web3.eth.abi.encodeFunctionSignature(
      methodInterface2
    )
    await baseContracts['ExchangesAuthority'].whitelistMethod(
      methodSignature2,
      ethfinexAdapterAddress,
      true
    ) // byte4(keccak256(method))
    await dragoInstance.methods
      .operateOnExchange(ethfinexAddress, assembledTransaction2)
      .send({ ...transactionDefault })
  })
  it('withdraws some ETH from its ethfinex wrapper', async () => {
    // adds additional ether to the pool to be able to deposit
    const purchaseAmount = web3.utils.toWei('1.1')
    await dragoInstance.methods.buyDrago().send({
      ...transactionDefault,
      value: purchaseAmount
    })
    await web3.eth.getBalance(dragoAddress)

    const tokenAddress = null
    const tokenWrapper = await baseContracts['WrapperLockEth'].address
    const toBeWrapped = web3.utils.toWei('0.1') // alt 200000
    const time = 1 // minimum duration 1 hour.
    const isOld = 0 // is a standard ERC20 token

    await baseContracts['ExchangesAuthority'].whitelistWrapper(
      tokenWrapper,
      true
    )
    await baseContracts['ExchangesAuthority'].whitelistTokenOnWrapper(
      tokenAddress,
      tokenWrapper,
      true
    )

    const methodInterface = {
      name: 'wrapToEfx',
      type: 'function',
      inputs: [
        {
          type: 'address',
          name: 'token'
        },
        {
          type: 'address',
          name: 'wrapper'
        },
        {
          type: 'uint256',
          name: 'value'
        },
        {
          type: 'uint256',
          name: 'forTime'
        },
        {
          type: 'bool',
          name: 'erc20Old'
        }
      ]
    }
    const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
      methodInterface,
      [tokenAddress, tokenWrapper, toBeWrapped, time, isOld]
    )

    const methodSignature = await web3.eth.abi.encodeFunctionSignature(
      methodInterface
    )
    await baseContracts['ExchangesAuthority'].whitelistMethod(
      methodSignature,
      ethfinexAdapterAddress,
      true
    ) // byte4(keccak256(method))
    await dragoInstance.methods
      .operateOnExchange(ethfinexAddress, assembledTransaction)
      .send({ ...transactionDefault })

    // double check the drago has a positive balance of wrapped ether
    await baseContracts['WrapperLockEth'].balanceOf(dragoAddress)

    // we now may unwrap
    const amountToWithdraw = web3.utils.toWei('0.05')
    const v = 1
    const r =
      '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock bytes32
    const s =
      '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock bytes32
    const validUntil = 1

    const methodInterface2 = {
      name: 'unwrap',
      type: 'function',
      inputs: [
        {
          type: 'address',
          name: 'token'
        },
        {
          type: 'address',
          name: 'wrapper'
        },
        {
          type: 'uint256',
          name: 'value'
        },
        {
          type: 'uint8',
          name: 'v'
        },
        {
          type: 'bytes32',
          name: 'r'
        },
        {
          type: 'bytes32',
          name: 's'
        },
        {
          type: 'uint256',
          name: 'signatureValidUntilBlock'
        }
      ]
    }
    const assembledTransaction2 = await web3.eth.abi.encodeFunctionCall(
      methodInterface2,
      [tokenAddress, tokenWrapper, amountToWithdraw, v, r, s, validUntil]
    )
    const methodSignature2 = await web3.eth.abi.encodeFunctionSignature(
      methodInterface2
    )
    await baseContracts['ExchangesAuthority'].whitelistMethod(
      methodSignature2,
      ethfinexAdapterAddress,
      true
    ) // byte4(keccak256(method))
    await dragoInstance.methods
      .operateOnExchange(ethfinexAddress, assembledTransaction2)
      .send({ ...transactionDefault })
  })
  it('withdraws some ETH from its token wrapper', async () => {
    // we might bring this function into new Dragoweth9.test.js
    // adds additional ether to the pool to be able to deposit
    const purchaseAmount = web3.utils.toWei('1.1')
    await dragoInstance.methods.buyDrago().send({
      ...transactionDefault,
      value: purchaseAmount
    })
    await web3.eth.getBalance(dragoAddress)

    const tokenAddress = null
    const tokenWrapper = await baseContracts['WETH9'].address
    const toBeWrapped = web3.utils.toWei('0.1') // alt 200000

    await baseContracts['ExchangesAuthority'].whitelistWrapper(
      tokenWrapper,
      true
    )
    await baseContracts['ExchangesAuthority'].whitelistTokenOnWrapper(
      tokenAddress,
      tokenWrapper,
      true
    )

    const methodInterface = {
      name: 'wrapEth',
      type: 'function',
      inputs: [
        {
          type: 'address',
          name: 'wrapper'
        },
        {
          type: 'uint256',
          name: 'amount'
        }
      ]
    }
    const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
      methodInterface,
      [tokenWrapper, toBeWrapped]
    )
    const methodSignature = await web3.eth.abi.encodeFunctionSignature(
      methodInterface
    )
    const weth9AdapterAddress = await baseContracts['AWeth'].address
    await baseContracts['ExchangesAuthority'].whitelistMethod(
      methodSignature,
      weth9AdapterAddress,
      true
    ) // byte4(keccak256(method))
    await dragoInstance.methods
      .operateOnExchange(tokenWrapper, assembledTransaction)
      .send({ ...transactionDefault })

    // double check the drago has a positive balance of wrapped ether
    await baseContracts['WETH9'].balanceOf(dragoAddress)

    // we now may unwrap
    const amountToWithdraw = web3.utils.toWei('0.05')

    const methodInterface2 = {
      name: 'unwrapEth',
      type: 'function',
      inputs: [
        {
          type: 'address',
          name: 'wrapper'
        },
        {
          type: 'uint256',
          name: 'amount'
        }
      ]
    }
    const assembledTransaction2 = await web3.eth.abi.encodeFunctionCall(
      methodInterface2,
      [tokenWrapper, amountToWithdraw]
    )
    const methodSignature2 = await web3.eth.abi.encodeFunctionSignature(
      methodInterface2
    )
    await baseContracts['ExchangesAuthority'].whitelistMethod(
      methodSignature2,
      weth9AdapterAddress,
      true
    ) // byte4(keccak256(method))
    await dragoInstance.methods
      .operateOnExchange(tokenWrapper, assembledTransaction2)
      .send({ ...transactionDefault })
  })
  it.skip('does not execute when withdraws the wrapped eth before expiry', async () => {})
  it.skip('executes a failing deposit and verifies that allowance is 0 if deposit fails', async () => {
    // TODO // make sure that if by any change deposit(params) fails, allowance is 0
  })
})
