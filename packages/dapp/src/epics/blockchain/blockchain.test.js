import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import globalActions from '../../actions/global-actions'

const initAction = blockChainActions.blockChainInit()

class BlockChainServiceMock {
  init = () => of(initAction)
}

jest.doMock('./BlockChainService', () => BlockChainServiceMock)
jest.doMock('../../api', () => ({}))
const blockchainEpic = require('./blockchain').blockchainEpic

const pushAction = () => ({
  type: '@@router/CALL_HISTORY_METHOD',
  payload: {
    args: ['/login'],
    method: 'push'
  }
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
  it('dispatches a router push action if web3 is not defined', () => {
    const inputValues = {
      a: globalActions.init()
    }
    const expectedValues = {
      b: pushAction()
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
