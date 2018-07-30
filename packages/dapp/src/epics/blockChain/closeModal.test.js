import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import blockChainActions from '../../actions/blockchain-actions'
import closeModalEpic from './closeModal'
import globalActions from '../../actions/global-actions'

describe('closeModalEpic', () => {
  it('dispatches a closeModal action when transactionCompleted is fired', () => {
    global.web3 = {}
    const inputValues = {
      a: blockChainActions.transactionCompleted()
    }
    const expectedValues = {
      b: globalActions.closeModal()
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = closeModalEpic(action$)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })

  it('dispatches a closeModal action when transactionFailed is fired', () => {
    const inputValues = {
      a: blockChainActions.transactionFailed()
    }
    const expectedValues = {
      b: globalActions.closeModal()
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = closeModalEpic(action$)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
