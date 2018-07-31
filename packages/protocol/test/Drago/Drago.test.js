import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import dragoArtifact from '../../artifacts/Drago.json'
import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
  let dragoId
  let dragoAddress
  let dragoInstance
  let dragoSupply
  let transactionDefault

  beforeAll(async () => {
    await baseContracts['DragoFactory'].createDrago('my new drago', 'DRA')
    const dragoData = await baseContracts['DragoRegistry'].fromName('my new drago')
    const [id, address] = dragoData
    dragoId = id
    dragoAddress = address
    dragoInstance = new web3.eth.Contract(
      dragoArtifact.networks[GANACHE_NETWORK_ID].abi,
      dragoAddress
    )
  })

/*
  describe('buyDrago', () => {
    it('increases total supply as consequece of purchase', async () => {
      dragoSupply = web3.utils.toWei('1')
      transactionDefault = {
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      const txHash = await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: dragoSupply
      })
      expect(txHash).toBeHash()
    })
  })
*/

  describe('changeMinPeriod', () => {
    it('can only be called by the factory DAO', async () => {
      await expect(
        dragoInstance.methods.changeMinPeriod('2')
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setTransactionFee', () => {
    it('sets a transaction fee for purchases', async () => {
      const txHash = await dragoInstance.methods.setTransactionFee('2', '2')
      expect(txHash).toBeHash()
    })
  })
})
