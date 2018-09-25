export default class BaseContract {
  public readonly rawWeb3Contract: any
  constructor(web3: any, address: string, abi: any) {
    this.rawWeb3Contract = new web3.eth.Contract(abi, address)
  }
}
