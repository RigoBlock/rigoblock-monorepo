import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'

import dragoArtifact from '../../artifacts/Drago.json'
import er20Artifact from '../../artifacts/ERC20.json'
import moment from 'moment'
import web3 from '../web3'

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
    selfCustodyProxyAddress = '0x0000000000000000000000000000000000000000'
    ethAddress = '0x0000000000000000000000000000000000000000'
    selfCustodyAddress = accounts[0]
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
  })

  describe('operateOnExchange', () => {
    it('sends ETH to a self custody wallet', async () => {
      // adds additional ether to the pool to be able to transfer
      const purchaseAmount = web3.utils.toWei('5.1')
      await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: purchaseAmount
      })

      const toBeTransferred = web3.utils.toWei('1.51') //web3.utils.toWei('1.1') //1e16 is 10 finney

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

/*
      const txHash = await dragoInstance.methods
        .operateOnExchange(selfCustodyProxyAddress, [assembledTransaction])
        .send({ ...transactionDefault })
      expect(txHash.toBeHash())
*/
    })
    it.skip('fails to send ETH not holding 1st threshold GRG', async () => {

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
