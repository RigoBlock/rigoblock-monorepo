import { Job } from 'bull'
import api from '../api'
import logger from '../logger'
import statsD from '../statsd'
import web3 from '../web3'

const task = async () => {
  await api.init(web3)
  const VaultEventful = api.contract.VaultEventful
  const vaultEventful = await VaultEventful.createAndValidate(
    web3,
    VaultEventful.address
  )
}

export default task
