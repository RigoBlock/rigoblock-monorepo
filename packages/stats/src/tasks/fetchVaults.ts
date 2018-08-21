import api from '../api'
import redis from '../redis'
import web3 from '../web3'

const task = async () => {
  await api.init(web3)
  const { VaultEventful } = api.contract
  const vaultEventful = await VaultEventful.createAndValidate(
    web3,
    VaultEventful.address
  )
  const vaultCreatedEvents = await vaultEventful
    .VaultCreatedEvent({})
    .get({ fromBlock: '0', toBlock: 'latest' })

  const vaults = vaultCreatedEvents.map(vaultEvent =>
    redis.sadd(
      `vaults`,
      JSON.stringify({
        address: vaultEvent.args.vault,
        name: vaultEvent.args.name,
        symbol: vaultEvent.args.symbol
      })
    )
  )
  return Promise.all(vaults)
}

export default task
