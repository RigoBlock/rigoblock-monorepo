import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import totlePrimaryArtifact from '../../artifacts/TotlePrimary.json'
import web3 from '../web3'

const contractName = 'TotlePrimary'

describeContract(contractName, () => {
  let totlePrimaryAddress
  let totlePrimaryInstance
  let transactionDefault
  let handlerMockAddress // handler is already whitelisted
  let rigoTokenAddress
  let weth9Address
  let tokenTransferProxyAddress

  beforeAll(async () => {
    handlerMockAddress = await baseContracts['HandlerMock'].address
    rigoTokenAddress = await baseContracts['RigoToken'].address
    weth9Address = await baseContracts['WETH9'].address
    tokenTransferProxyAddress= await baseContracts['TokenTransferProxy'].address
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
      // wrap eth and send to mock handler, weth requires approval
      const grgAmount = 48333317481
      await baseContracts['RigoToken'].transfer(
        handlerMockAddress,
        grgAmount
      )

      const isSell = false
      const encodedOrder = await web3.eth.abi.encodeParameters(
        ['uint256'],
        [20000]
      )

      const encodedAll = await totlePrimaryInstance.methods.performRebalance(
        [
          [
            isSell,
            rigoTokenAddress,
            10000,
            true,
            1,
            1000,
            [
              [
                handlerMockAddress,
                encodedOrder
              ]
            ]
          ]
        ],
        '0x9899beaad8ded0402c39148afdd03850dfe29fda',
        '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d'
      ).encodeABI()
      const ethAmount = 50000
      console.log(encodedAll)

      await expect(web3.eth.sendTransaction({
        from: accounts[0],
        to: totlePrimaryAddress,
        data: encodedAll,
        value: ethAmount
      })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
    it('performs a GRG-ETH sell transaction', async () => {

      // feed mock handler with eth by sending
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: handlerMockAddress,
        value: '50000'
      })
      const grgToSell = 10000
      await baseContracts['RigoToken'].approve(
        tokenTransferProxyAddress,
        grgToSell,
        { from: accounts[0] }
      )

      const isSell = true
      const encodedOrder = await web3.eth.abi.encodeParameters(
        ['uint256'],
        [20000]
      )

      const encodedAll = await totlePrimaryInstance.methods.performRebalance(
        [
          [
            isSell,
            rigoTokenAddress,
            grgToSell,
            false,
            1,
            10000,
            [
                [
                  handlerMockAddress,
                  encodedOrder
                ]
            ]
          ]
        ],
        '0x0000000000000000000000000000000000000000',
        '0x1111111111111111111111111111111111111111111111111111111111111111'
      ).encodeABI()

      await expect(web3.eth.sendTransaction({
        from: accounts[0],
        to: totlePrimaryAddress,
        data: encodedAll,
      })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })
})
