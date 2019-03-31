import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import totlePrimaryArtifact from '../../artifacts/TotlePrimary.json'
import web3 from '../web3'

const contractName = 'TotlePrimary'

describeContract(contractName, () => {
  let totlePrimaryAddress
  let totlePrimaryInstance
  let transactionDefault

  beforeAll(async () => {
    totlePrimaryAddress = await baseContracts[
      'TotlePrimary'
    ].address
    totlePrimaryInstance = new web3.eth.Contract(
      totlePrimaryArtifact.networks[GANACHE_NETWORK_ID].abi,
      totlePrimaryAddress
    )
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
  })

  describe('performRebalance', () => {
    it('performs a ETH-GRG transaction', async () => {
      /*await baseContracts['TotlePrimary'].addHandlerToWhitelist(
        baseContracts['HandlerMock'].address
      )*/ // already whitelisted
      await baseContracts['RigoToken'].transfer(
        baseContracts['HandlerMock'].address,
        48333317481
      )
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: baseContracts['HandlerMock'].address,
        value: 50000
      })

      const isSell = true // false to Eth to Dai, true for Dai to Eth

      //Returns an encoded function call to the primary that has a buy order for the handlerMock
      /*
      function generateEthToDaiRebalance(handlerMock, totlePrimary){
        return generateRebalance(handlerMock, totlePrimary, false)
      }

      function generateDaiToEthRebalance(handlerMock, totlePrimary){
        return generateRebalance(handlerMock, totlePrimary, true)
      }*/

      const encodedOrder = await web3.eth.abi.encodeParameters(
        ['uint256'],
        [2000]
      )

      const txHash = await totlePrimaryInstance.methods.performRebalance(
        [
          [
            isSell,
            baseContracts['RigoToken'].address,
            10000,
            false,
            1,
            10000,
            [
                [baseContracts['HandlerMock'].address, encodedOrder]
            ]
          ]
        ],
        '0x0000000000000000000000000000000000000000',
        '0x1111111111111111111111111111111111111111111111111111111111111111'
      ).send({ ...transactionDefault })
    })
  })
})
