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
    it('performs a ETH-GRG buy transaction', async () => {
      /*await baseContracts['TotlePrimary'].addHandlerToWhitelist(
        baseContracts['HandlerMock'].address
      )*/ // already whitelisted

      // wrap eth and send to mock handler, weth requires approval
      const grgAmount = 48333317481
      await baseContracts['RigoToken'].transfer(
        baseContracts['HandlerMock'].address,
        grgAmount
      )

      const isSell = false
      const encodedOrder = await web3.eth.abi.encodeParameters(
        ['tuple(uint256)'],
        [
          [20000]
        ]
      )

      // default account takes the order by sending ETH
      const transactionDetails = {
        value: 10000,
        from: accounts[0],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      const performRebalance = await totlePrimaryInstance.methods.performRebalance(
        [
          [
            isSell,
            baseContracts['WETH9'].address,
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
      ).send({ ...transactionDetails }) // totle requires receiving eth
    })
    it('performs a GRG-ETH sell transaction', async () => {

      // feed mock handler with eth by sending
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: baseContracts['HandlerMock'].address,
        value: 50000
      })
      const grgToSell = 10000
      await baseContracts['RigoToken'].approve(
        baseContracts['TokenTransferProxy'].address,
        grgToSell,
        { from: accounts[0] }
      )

      const isSell = true
      const encodedOrder = await web3.eth.abi.encodeParameters(
        ['tuple(uint256)'],
        [
          [20000]
        ]
      )
      // Returned error: VM Exception while processing transaction: invalid opcode
      //const encodedOrder = await baseContracts['AbiEncoder'].abiEncodeHandlerMockOrder(20000)

      const performRebalance = await totlePrimaryInstance.methods.performRebalance(
        [
          [
            isSell,
            baseContracts['RigoToken'].address,
            grgToSell,
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
      ).encodeABI()
      web3.eth.sendTransaction({
        from: accounts[0],
        to: baseContracts['TotlePrimary'].address,
        data: performRebalance
      })
    })
  })
})
