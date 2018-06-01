import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import globalActions from '../../actions/global-actions'

describe('blockchain epics', () => {
  const initAction = blockChainActions.blockChainInit()

  const block = {
    address: '0x6dddcaede2071883c85c6e5781524985608d2460',
    args: {
      vault: '0x421e1cef6e85e78da2470e54af64a626f45afb85',
      from: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
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
  const fetchVaultEventsSpy = jest.fn()

  const mockStore = {
    getState: getStateSpy
  }
  class BlockChainServiceMock {
    init = () => of(initAction)
    fetchVaultEvents = fetchVaultEventsSpy
  }

  let blockchainEpic
  let blockchainFetchEventsEpic

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('./BlockChainService', () => BlockChainServiceMock)
    jest.doMock('../../api', () => ({}))
    blockchainEpic = require('./blockchain').blockchainEpic
    blockchainFetchEventsEpic = require('./blockchain')
      .blockchainFetchEventsEpic
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

  describe('blockchainFetchEventsEpic', () => {
    it('dispatches a register block event on login', () => {
      getStateSpy.mockReturnValueOnce({
        user: {
          preferences: {
            currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
          },
          blockChain: {
            accounts: {
              '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {}
            }
          }
        }
      })
      fetchVaultEventsSpy.mockReturnValueOnce(
        of(blockChainActions.registerBlock(block))
      )
      const inputValues = {
        a: blockChainActions.blockChainLogIn(
          'MetaMask/v4.6.1',
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
        )
      }
      const expectedValues = {
        b: blockChainActions.registerBlock(block)
      }

      const inputMarble = 'a'
      const expectedMarble = 'b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = blockchainFetchEventsEpic(action$, mockStore)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
    it('fetches from the last block saved on redux state', () => {
      const lastBlock = 15
      getStateSpy.mockReturnValueOnce({
        user: {
          preferences: {
            currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
          },
          blockChain: {
            accounts: {
              '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
                lastBlock
              }
            }
          }
        }
      })
      fetchVaultEventsSpy.mockReturnValueOnce(
        of(blockChainActions.registerBlock(block))
      )
      const inputValues = {
        a: blockChainActions.blockChainLogIn(
          'MetaMask/v4.6.1',
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
        )
      }
      const expectedValues = {
        b: blockChainActions.registerBlock(block)
      }

      const inputMarble = 'a'
      const expectedMarble = 'b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = blockchainFetchEventsEpic(action$, mockStore)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()

      expect(fetchVaultEventsSpy).toHaveBeenCalledWith(lastBlock)
    })
  })
})
