import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { actionTypes } from '../../constants/action-types'
import { counterEpic } from './counter'

describe('counterEpic', () => {
  it('Dispatches the same action back with COUNTER_SUBTRACT type', () => {
    const inputValues = {
      a: { type: actionTypes.COUNTER_ADD, amount: 1 }
    }
    const expectedValues = {
      b: { type: actionTypes.COUNTER_SUBTRACT, amount: 1 }
    }

    const inputMarble = 'a|'
    const expectedMarble = '----------b|'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = counterEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
