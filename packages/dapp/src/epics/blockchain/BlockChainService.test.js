import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { actionTypes } from '../../constants/action-types'
import BlockChainService from './BlockChainService'

describe('BlockChainService', () => {
  it('Dispatches the same action back with COUNTER_SUBTRACT type', () => {
    const inputValues = {
      a: { type: actionTypes.COUNTER_ADD, amount: 1 }
    }
    const expectedValues = {
      b: { type: actionTypes.COUNTER_SUBTRACT, amount: 1 }
    }

    const inputMarble = ''
    const expectedMarble = 'b|'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )

    const apiMock = { init: () => Promise.resolve('wtf') }
    const service = new BlockChainService(apiMock, action$, null, ts)
    const outputAction = service.init()

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
