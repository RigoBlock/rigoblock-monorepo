import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import globalActions from '../../actions/global-actions'

const initAction = globalActions.blockchainInit()

class BlockChainServiceMock {
  init = () => of(initAction)
}

jest.doMock('./BlockChainService', () => BlockChainServiceMock)
jest.doMock('../../api', () => ({}))
const blockchainEpic = require('./blockchain').blockchainEpic

describe('blockchainEpic', () => {
  it('dispatches an init action when the BlockChainService is initialized', () => {
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
})
