import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { VAULT } from '../../constants/blockchain'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'

describe('watchVaultEvents', () => {
  const owner = '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
  const block = {
    address: '0x6dddcaede2071883c85c6e5781524985608d2460',
    args: {
      vault: '0x421e1cef6e85e78da2470e54af64a626f45afb85',
      from: owner,
      to: '0x421e1cef6e85e78da2470e54af64a626f45afb85',
      amount: '3000000',
      revenue: '3000000000000000000'
    },
    blockHash:
      '0x537306240482321526d2a9902b5f9d0438cac4c48e9ea225db7635a23e5d11bf',
    blockNumber: 26,
    event: 'SellVault',
    logIndex: 0,
    transactionHash:
      '0xfdde0861e2b7012c78f2af0eb2d2890be68388b70209bde69c8261230ff72e2e',
    transactionIndex: 0,
    type: 'mined'
  }
  const getStateSpy = jest.fn()
  const watchVaultEventsSpy = jest.fn()

  const mockStore = {
    getState: getStateSpy
  }
  class BlockChainServiceMock {
    init = () => of(initAction)
    watchVaultEvents = watchVaultEventsSpy
  }
  const serviceInstance = new BlockChainServiceMock()
  BlockChainServiceMock.createInstance = () => serviceInstance
  BlockChainServiceMock.getInstance = () => serviceInstance
  let watchVaultEvents

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../blockChain/BlockChainService', () => BlockChainServiceMock)
    jest.doMock('../../api', () => ({}))
    watchVaultEvents = require('./watchVaultEvents').default
  })

  it('fetches from the last block saved on redux state', () => {
    const lastBlock = 15
    getStateSpy.mockReturnValueOnce({
      preferences: {
        currentAccount: owner
      },
      blockChain: {
        accounts: {
          [owner]: {
            lastBlock,
            vaults: [],
            vaultBlocks: []
          }
        }
      }
    })
    watchVaultEventsSpy.mockReturnValueOnce(
      of(blockChainActions.registerBlock(VAULT, block))
    )
    const inputValues = {
      a: blockChainActions.vaultFetchCompleted()
    }
    const expectedValues = {
      b: blockChainActions.registerBlock(VAULT, block)
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = watchVaultEvents(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })

  it('stops watching after a LOGGED_IN action is fired', () => {
    const lastBlock = 15
    getStateSpy.mockReturnValueOnce({
      preferences: {
        currentAccount: owner
      },
      blockChain: {
        accounts: {
          [owner]: {
            lastBlock,
            vaults: [],
            vaultBlocks: []
          }
        }
      }
    })

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    watchVaultEventsSpy.mockReturnValueOnce(
      merge(
        of(blockChainActions.registerBlock(VAULT, block)),
        of(blockChainActions.registerBlock(VAULT, block)),
        of(blockChainActions.registerBlock(VAULT, block)).delay(20, ts)
      )
    )
    const inputValues = {
      a: blockChainActions.vaultFetchCompleted(),
      b: blockChainActions.blockChainLogIn('1234', 'my provider')
    }
    const expectedValues = {
      b: blockChainActions.registerBlock(VAULT, block)
    }

    const inputMarble = 'a-b'
    const expectedMarble = '(bb)'

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = watchVaultEvents(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.maxFrames = 100
    ts.flush()
  })
})
