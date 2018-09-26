import Web3 = require('web3')
import { EventEmitter, EventLog } from 'web3/types'

export interface EventFilter {
  [key: string]: string
}

export interface EventOptions {
  filter?: EventFilter
  fromBlock?: number
  toBlock?: number
  topics?: string[]
}

export default class BaseContract<Events> {
  public rawWeb3Contract: any

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
