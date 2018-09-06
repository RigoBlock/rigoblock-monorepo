// import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
// import aEthfinexArtifact from '../../artifacts/AEthfinex.json'

// import web3 from '../web3'

// const contractName = 'AEthfinex'

// // the tests work as long as the AEthfinex.sol functions are public for debugging and as long as the conditions for delegatecall are commented
// describeContract(contractName, () => {
//   let aEthfinexAddress
//   let aEthfinexInstance
//   let transactionDefault
//   let GRGtokenAddress
//   let authorityAddress

//   beforeAll(async () => {
//     aEthfinexAddress = baseContracts['AEthfinex'].address
//     aEthfinexInstance = new web3.eth.Contract(
//       aEthfinexArtifact.networks[GANACHE_NETWORK_ID].abi,
//       aEthfinexAddress
//     )
//     transactionDefault = {
//       from: accounts[0],
//       gas: GAS_ESTIMATE,
//       gasPrice: 1
//     }
//     GRGtokenAddress = await baseContracts['RigoToken'].address
//     authorityAddress = baseContracts['ExchangesAuthority'].address
//     await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
//   })

//   describe('wrapToEfx', () => {
//     // this works only with wrapToEfx payable
//     it.skip('wraps eth to the efx wrapper', async () => {
//       const balance = await web3.eth.getBalance(accounts[0])

//       const tokenAddress = null //Ether has address 0x0
//       const tokenWrapper = await baseContracts['WrapperLockEth'].address
//       const toBeWrapped = 1e16 // 10 finney
//       const time = 1 // 1 hour lockup (the minimum)
//       const authorityAddress = baseContracts['ExchangesAuthority'].address

//       await baseContracts['ExchangesAuthority'].whitelistWrapper(
//         tokenWrapper,
//         true
//       )
//       await baseContracts['ExchangesAuthority'].whitelistAssetOnExchange(
//         tokenAddress,
//         tokenWrapper,
//         true
//       )
//       await aEthfinexInstance.methods
//         .wrapToEfx(tokenAddress, tokenWrapper, toBeWrapped, time)
//         .send({
//           ...transactionDefault,
//           value: toBeWrapped
//         })
//       const wethBalance = await baseContracts['WrapperLockEth'].balanceOf(
//         aEthfinexAddress
//       )
//       // if a deposit is repeated, weth balance will be equal to the sum of depositAmouns
//       expect(wethBalance.toString()).toEqual(toBeWrapped.toString())
//     })
//     it.skip('wraps some GRG tokens to its efx token wrapper', async () => {
//       //must send some GRGs to the adapter first
//       const GRGtokensAmount = web3.utils.toWei('101')
//       await baseContracts['RigoToken'].transfer(
//         aEthfinexAddress,
//         GRGtokensAmount
//       )

//       const tokenAddress = await baseContracts['RigoToken'].address
//       const tokenWrapper = await baseContracts['WrapperLock'].address
//       const toBeWrapped = web3.utils.toWei('10') // alt 200000
//       const time = 1 // minimum duration 1 hour.

//       await baseContracts['ExchangesAuthority'].whitelistWrapper(
//         tokenWrapper,
//         true
//       )
//       await baseContracts['ExchangesAuthority'].whitelistAssetOnExchange(
//         tokenAddress,
//         tokenWrapper,
//         true
//       )
//       await aEthfinexInstance.methods
//         .wrapToEfx(tokenAddress, tokenWrapper, toBeWrapped, time)
//         .send({ ...transactionDefault })
//       const wrappedTokensAmount = await baseContracts['WrapperLock'].balanceOf(
//         aEthfinexAddress
//       )
//       expect(wrappedTokensAmount.toString()).toEqual(toBeWrapped.toString())
//     })
//   })
// })
