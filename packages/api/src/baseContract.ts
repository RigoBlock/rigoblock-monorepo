export default class BaseContract {
  public readonly rawWeb3Contract: any;
  constructor(web3: any, address: string, abi: any) {
    this.rawWeb3Contract = new web3.eth.Contract(abi, address)
  }

  private async promisify(func: any, args: any): Promise<any> {
    return new Promise((resolve, reject) => {
      func(...args, (err: any, data: any) => err ? reject(err) : resolve(data))
    });
  }
}
