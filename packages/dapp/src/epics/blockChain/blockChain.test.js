import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import globalActions from '../../actions/global-actions'

describe('blockchain epics', () => {
  const initAction = blockChainActions.blockChainInit()

  class BlockChainServiceMock {
    init = () => of(initAction)
  }
  const serviceInstance = new BlockChainServiceMock()
  BlockChainServiceMock.createInstance = () => serviceInstance
  BlockChainServiceMock.getInstance = () => serviceInstance
  let blockchainEpic

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('./BlockChainService', () => BlockChainServiceMock)
    jest.doMock('../../api', () => ({}))
    blockchainEpic = require('./blockChain').blockchainEpic
  })

  describe('blockchainEpic', () => {
    beforeEach(() => {
      global.web3 = undefined
    })

    it('dispatches an init action when the BlockChainService is initialized', () => {
      global.web3 = {}
      const inputValues = {
        a: globalActions.init()
      }
      const expectedValues = {
        b: initAction
      }

      const inputMarble = 'a|'
      const expectedMarble = 'b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = blockchainEpic(action$, null, ts)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })

    it('dispatches blockChain logout action if web3 is not defined', () => {
      const inputValues = {
        a: globalActions.init()
      }
      const expectedValues = {
        b: blockChainActions.blockChainLogout()
      }

      const inputMarble = 'a'
      const expectedMarble = 'b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = blockchainEpic(action$, null, ts)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
  })
})
