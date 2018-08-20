import * as Web3 from 'web3'

export interface IContract {
  createAndValidate(web3: Web3, contractAddress: string): Promise<any>
  isDeployed(): boolean
}
