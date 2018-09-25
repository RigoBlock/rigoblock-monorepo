interface EventFilter {
  [key: string]: string
}

interface EventOptions {
  filter?: EventFilter
  fromBlock?: number
  toBlock?: number
  topics?: string[]
}

export default class BaseContract<Events> {
  public readonly rawWeb3Contract: any
  constructor(web3: any, address: string, abi: any) {
    this.rawWeb3Contract = new web3.eth.Contract(abi, address)
  }

  public async getPastEvents(eventName: Events, options?: EventOptions) {
    return this.rawWeb3Contract.getPastEvents(eventName, options || {})
  }
}
