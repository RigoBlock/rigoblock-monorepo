import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { TestScheduler } from 'rxjs'
import { blockLabels } from '../../constants/blockchain'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

describe('registerVaults epic', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const vaultEvent = {
    address: '0x001',
    args: {
      vault: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
      from: owner,
      to: '0x005',
      amount: '1',
      revenue: '1'
    },
    event: 'BuyVault'
  }
  const vaultData = [
    new BigNumber(0),
    'Rocksolid Vault',
    'VLT',
    owner,
    owner,
    null
  ]
  const apiMock = {
    contract: {
      DragoRegistry: {
        fromAddress: jest.fn()
      }
    }
  }
  let fromPromiseSpy
  let registerVaultsEpic

  beforeEach(() => {
    fromPromiseSpy = jest.fn().mockReturnValueOnce(of(vaultData))

    jest.resetModules()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))

    registerVaultsEpic = require('./vaults').registerVaultsEpic
  })

  it('emits REGISTER_VAULT containing a parsed vault object + REGISTER_VAULT_BLOCK containing a vault event block', () => {
    const inputValues = {
      a: blockChainActions.registerBlock(blockLabels.VAULT, vaultEvent)
    }
    const expectedValues = {
      b: vaultActions.registerVaultBlock({
        label: blockLabels.VAULT,
        block: vaultEvent
      }),
      c: vaultActions.registerVault({
        ['0xc1Eba7b6F9f06E4491a499E653878464e40AB70e']: {
          id: 0,
          group: null,
          name: 'Rocksolid Vault',
          symbol: 'VLT',
          owner
        }
      })
    }

    const inputMarble = 'a'
    const expectedMarble = '(bc)'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = registerVaultsEpic(action$)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.flush()
  })
})

describe('fetchVaultEventsEpic', () => {
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
  const serviceInstance = new BlockChainServiceMock()
  BlockChainServiceMock.createInstance = () => serviceInstance
  BlockChainServiceMock.getInstance = () => serviceInstance
  let fetchVaultEventsEpic

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../blockChain/BlockChainService', () => BlockChainServiceMock)
    jest.doMock('../../api', () => ({}))
    fetchVaultEventsEpic = require('./vaults').fetchVaultEventsEpic
  })

  it('fetches from the first unfetched block', () => {
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
    const outputAction = fetchVaultEventsEpic(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()

    expect(fetchVaultEventsSpy).toHaveBeenCalledWith(lastBlock + 1)
  })
})

describe('watchVaultEventsEpic', () => {
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
  let fetchVaultEventsEpic

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../blockChain/BlockChainService', () => BlockChainServiceMock)
    jest.doMock('../../api', () => ({}))
    fetchVaultEventsEpic = require('./vaults').watchVaultEventsEpic
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
              lastBlock,
              vaults: [],
              vaultBlocks: []
            }
          }
        }
      }
    })
    watchVaultEventsSpy.mockReturnValueOnce(
      of(blockChainActions.registerBlock(block))
    )
    const inputValues = {
      a: blockChainActions.vaultFetchCompleted()
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
    const outputAction = fetchVaultEventsEpic(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })

  it('stops watching after a LOGGED_IN action is fired', () => {
    const lastBlock = 15
    getStateSpy.mockReturnValueOnce({
      user: {
        preferences: {
          currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
        },
        blockChain: {
          accounts: {
            '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
              lastBlock,
              vaults: [],
              vaultBlocks: []
            }
          }
        }
      }
    })
    watchVaultEventsSpy.mockReturnValueOnce(
      of(blockChainActions.registerBlock(block))
    )
    const inputValues = {
      a: blockChainActions.vaultFetchCompleted()
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
    const outputAction = fetchVaultEventsEpic(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
