import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import vaultArtifact from '../../artifacts/Vault.json'
import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {

  beforeAll(async () => {
    await baseContracts['DragoFactory'].createDrago('my new drago', 'DRA')
    const dragoData = await baseContracts['DragoRegistry'].fromName('my new drago')
    const [id, address] = dragoData
    dragoId = id
    dragoAddress = address
    const dragoInstance = new web3.eth.Contract(
      dragoArtifact.networks[GANACHE_NETWORK_ID].abi,
      dragoAddress
    )
  })

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
})
