import web3 from '../web3'

// Returns the time of the last mined block in seconds
export const latestTime = async () => {
  const block = await web3.eth.getBlock('latest')
  return block.timestamp
}
