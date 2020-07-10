import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import dragoArtifact from '../../artifacts/Drago.json'
import web3 from '../web3'

jest.setTimeout(30000)

const contractName = 'HGetDragoData'
let dragoNum
let hGetDragoDataInstance
let registryAddress
let dragos = []

describeContract(contractName, () => {
  beforeAll(async () => {
    dragoNum = 5
    const transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    hGetDragoDataInstance = new web3.eth.Contract(
      baseContracts['HGetDragoData'].abi,
      baseContracts['HGetDragoData'].address
    )
    registryAddress = await baseContracts['DragoRegistry'].address
    for (let i = 0; i < dragoNum; i++) {
      await baseContracts['DragoFactory'].createDrago(`Drago ${i}`, `DR${i}`)
      const dragoData = await baseContracts['DragoRegistry'].fromName(
        `Drago ${i}`
      )
      dragoData.push(`Drago ${i}`)
      dragos.push(dragoData)
      let dragoInstance = new web3.eth.Contract(
        dragoArtifact.networks[GANACHE_NETWORK_ID].abi,
        dragoData[1]
      )
      const purchaseAmount = web3.utils.toWei('0.1')
      await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: purchaseAmount
      })
    }
  })

  describe('HGetDragoData queryMultiDataFromId method', () => {
    it('Correctly returns an array from Ids', async () => {
      const dragoIds = dragos.map(drago => drago[0].toFixed())
      const dragoArray = await hGetDragoDataInstance.methods
        .queryMultiDataFromId(registryAddress, dragoIds)
        .call()
      expect(dragoArray).toBeArrayOfSize(dragoNum)
    })
    it('Correctly return drago details from Ids', async () => {
      const dragoIds = dragos.map(drago => drago[0].toFixed())
      const dragoArray = await hGetDragoDataInstance.methods
        .queryMultiDataFromId(registryAddress, dragoIds)
        .call()
      let i = 0
      dragos.forEach(dragoEntry => {
        const [
          name,
          symbol,
          sellPrice,
          buyPrice,
          owner,
          ,
          ,
          ,
          ,
          totalSupply,
          ethBalance,
          ,
          id,
          drago
        ] = dragoArray[i]
        expect(sellPrice).toBe('1000000000000000000')
        expect(buyPrice).toBe('1000000000000000000')
        expect(owner.toLowerCase()).toBe(accounts[0].toLowerCase())
        expect(totalSupply).toBe('100000')
        expect(ethBalance).toBe('100000000000000000')
        expect(name).toBe(dragoEntry[6].toString())
        expect(id).toBe(dragoEntry[0].toString())
        expect(drago.toLowerCase()).toBe(dragoEntry[1].toLowerCase())
        expect(symbol.toLowerCase()).toBe(dragoEntry[2].toLowerCase())
        i++
      })
    })
  })

  describe('HGetDragoData queryMultiDataFromAddress method', () => {
    it('Correctly returns an array from addresses', async () => {
      const dragoAddresses = dragos.map(drago => drago[1])
      const dragoArray = await hGetDragoDataInstance.methods
        .queryMultiDataFromAddress(registryAddress, dragoAddresses)
        .call()
      expect(dragoArray).toBeArrayOfSize(dragoNum)
    })
    it('Correctly return drago details from addresses', async () => {
      const dragoAddresses = dragos.map(drago => drago[1])
      const dragoArray = await hGetDragoDataInstance.methods
        .queryMultiDataFromAddress(registryAddress, dragoAddresses)
        .call()
      let i = 0
      dragos.forEach(dragoEntry => {
        const [
          name,
          symbol,
          sellPrice,
          buyPrice,
          owner,
          ,
          ,
          ,
          ,
          totalSupply,
          ethBalance,
          ,
          id,
          drago
        ] = dragoArray[i]
        expect(sellPrice).toBe('1000000000000000000')
        expect(buyPrice).toBe('1000000000000000000')
        expect(owner.toLowerCase()).toBe(accounts[0].toLowerCase())
        expect(totalSupply).toBe('100000')
        expect(ethBalance).toBe('100000000000000000')
        expect(name).toBe(dragoEntry[6].toString())
        expect(id).toBe(dragoEntry[0].toString())
        expect(drago.toLowerCase()).toBe(dragoEntry[1].toLowerCase())
        expect(symbol.toLowerCase()).toBe(dragoEntry[2].toLowerCase())
        i++
      })
    })
  })

  describe('HGetDragoData queryDataFromId method', () => {
    it('Correctly return drago details from id', async () => {
      const dragoTest = dragos[0]
      const dragoDetails = await hGetDragoDataInstance.methods
        .queryDataFromId(registryAddress, Number(dragoTest[0]))
        .call()
      const [
        name,
        symbol,
        sellPrice,
        buyPrice,
        owner,
        ,
        ,
        ,
        ,
        totalSupply,
        ethBalance,
        ,
        id,
        drago
      ] = dragoDetails

      expect(sellPrice).toBe('1000000000000000000')
      expect(buyPrice).toBe('1000000000000000000')
      expect(owner.toLowerCase()).toBe(accounts[0].toLowerCase())
      expect(totalSupply).toBe('100000')
      expect(ethBalance).toBe('100000000000000000')
      expect(name).toBe(dragoTest[6].toString())
      expect(id).toBe(dragoTest[0].toString())
      expect(drago.toLowerCase()).toBe(dragoTest[1].toLowerCase())
      expect(symbol.toLowerCase()).toBe(dragoTest[2].toLowerCase())
    })
  })

  describe('HGetDragoData queryDataFromAddress method', () => {
    it('Correctly return drago details from address', async () => {
      const dragoTest = dragos[1]
      const dragoDetails = await hGetDragoDataInstance.methods
        .queryDataFromAddress(registryAddress, dragoTest[1])
        .call()
      const [
        name,
        symbol,
        sellPrice,
        buyPrice,
        owner,
        ,
        ,
        ,
        ,
        totalSupply,
        ethBalance,
        ,
        id,
        drago
      ] = dragoDetails

      expect(sellPrice).toBe('1000000000000000000')
      expect(buyPrice).toBe('1000000000000000000')
      expect(owner.toLowerCase()).toBe(accounts[0].toLowerCase())
      expect(totalSupply).toBe('100000')
      expect(ethBalance).toBe('100000000000000000')
      expect(name).toBe(dragoTest[6].toString())
      expect(id).toBe(dragoTest[0].toString())
      expect(drago.toLowerCase()).toBe(dragoTest[1].toLowerCase())
      expect(symbol.toLowerCase()).toBe(dragoTest[2].toLowerCase())
    })
  })
})
