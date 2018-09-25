import { EventEmitter, EventLog } from 'web3/types'

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

  public getPastEvents(
    eventName: Events,
    options?: EventOptions
  ): Promise<EventLog[]> {
    return this.rawWeb3Contract.getPastEvents(eventName, options || {})
  }

  public allEvents(
    options?: EventOptions,
    cb?: Function
  ): Promise<EventEmitter> {
    return this.rawWeb3Contract.events.allEvents(options || {}, cb)
  }
  // TODO: write test for once
  public once(
    eventName: Events,
    options?: EventOptions,
    cb?: Function
  ): Promise<EventEmitter> {
    return this.rawWeb3Contract.once(eventName, options || {}, cb)
  }
}