// import { ActionsObservable } from 'redux-observable'
import { EventEmitter } from 'events'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import BlockChainServiceEpic from '../blockchain/BlockChainService'
import globalActions from '../../actions/global-actions'

const promiseModule = require('rxjs/observable/fromPromise')

const fromPromiseMock = jest.fn(promise => of(promise))
promiseModule.fromPromise = fromPromiseMock

describe('blockchainServiceEpic', () => {
  it('returns a blockchain init action', () => {
    const apiMock = {
      init: () => Promise.resolve('test'),
      engine: new EventEmitter(),
      web3: {
        eth: {
          getAccounts: () => {}
        }
      }
    }

    const expectedValues = {
      b: globalActions.blockchainInit()
    }

    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const blockChainServiceEpic = new BlockChainServiceEpic(
      apiMock,
      null,
      null,
      ts
    )
    const outputAction = blockChainServiceEpic.init()

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.flush()
  })
})
