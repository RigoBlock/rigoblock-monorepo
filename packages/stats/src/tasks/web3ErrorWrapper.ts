import Web3 from 'web3'
import { Job } from 'bull'

export default task => async (job: Job) => {
  const { web3Provider = {} } = job.data

  if (!Object.keys(web3Provider).length) {
    throw new Error('Web3 provider required for web3 error wrapper')
  }
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(web3Provider)
  )
  try {
    await task.apply(this, [job, web3])
    await (<any> web3.currentProvider.connection).close()
    return
  } catch (e) {
    await (<any> web3.currentProvider.connection).close()
    throw e
  }
}
