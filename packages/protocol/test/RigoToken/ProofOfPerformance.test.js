// import { BigNumber } from 'bignumber.js'

const contractName = 'ProofOfPerformance'
const vaultArtifact = require('../../artifacts/Vault.json')

import { GAS_ESTIMATE } from '../../constants'

describe(contractName, () => {
  describe('core functions', () => {
    describe('setRegistry', () => {
      it('sets the registry', async () => {
        const txHash = await baseContracts[contractName].setRegistry(
          baseContracts['DragoRegistry'].address
        )
        expect(txHash).toBeHash()
      })
    })
  })
  describe('public functions', () => {
    let vaultId
    let vaultAddress
    let value
    beforeAll(async () => {
      await baseContracts['VaultFactory'].createVault('test vault', 'VLT')
      const vaultData = await baseContracts['DragoRegistry'].fromSymbol('VLT')
      const [id, address] = vaultData
      vaultId = id
      vaultAddress = address
      const vaultInstance = new web3.eth.Contract(
        vaultArtifact.networks[networkId].abi,
        vaultAddress
      )
      value = web3.utils.toWei('2')
      await vaultInstance.methods.buyVault().send({
        from: accounts[1],
        value,
        gas: GAS_ESTIMATE,
        gasPrice: 1
      })
    })
    describe('calcNetworkValue', () => {
      it('calculates the total network value and the number of funds', async () => {
        const networkValues = await baseContracts[contractName]
          .calcNetworkValue()
          .then(res => res.map(val => val.toNumber()))
        const networkValue = networkValues.shift()
        const numberOfFunds = networkValues.pop()
        expect(networkValue).toEqual(Number(value))
        expect(numberOfFunds).toEqual(1)
      })
    })
    describe('claimPop', () => {
      it('calculates something', async () => {
        const test = await baseContracts[contractName].claimPop(vaultId)
        console.log(test)
      })
    })
    fdescribe('getPoolPrices', () => {
      it('returns the total supply and price for each fund', async () => {
        const dragoCount = await baseContracts['DragoRegistry'].dragoCount()
        console.log('HERE', dragoCount.toNumber())
        // const pricesArray = await baseContracts[contractName].getPoolPrices()
        // console.log(price)
      })
    })
    // describe('getPoolData', () => {
    //   it('calculates something', async () => {
    //     const test = await baseContracts[contractName].getPoolData(vaultId)
    //     console.log(test)
    //   })
    // })
    // describe('getPoolPrices', () => {
    //   it('calculates something', async () => {
    //     const test = await baseContracts[contractName].getPoolPrices()
    //     console.log(test)
    //   })
    // })
  })
})
