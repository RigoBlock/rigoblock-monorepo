const c = require('chalk')
const logger = require('./logger')
const deployContract = require('ethereum-waffle')

const printAddress = (name, address) => {
  return logger.info(c.bold(name), c.bold.magenta(address))
}

module.exports = async (baseAccount, network) => {
  const authority = await deployContract(baseAccount, network, 'Authority')
  printAddress('Authority', authority.address)

  const dragoRegistry = await deployContract(
    baseAccount,
    network,
    'DragoRegistry',
    [authority.address]
  )
  printAddress('DragoRegistry', dragoRegistry.address)

  const vaultEventful = await deployContract(
    baseAccount,
    network,
    'VaultEventful',
    [authority.address]
  )
  printAddress('VaultEventful', vaultEventful.address)

  logger.info(c.bold('Setting up VaultEventful...'))
  await authority.setVaultEventful(vaultEventful.address)

  const vaultFactory = await deployContract(
    baseAccount,
    network,
    'VaultFactory',
    [dragoRegistry.address, baseAccount, authority.address]
  )
  printAddress('VaultFactory', vaultFactory.address)

  logger.info(c.bold('Whitelisting VaultFactory...'))
  await authority.whitelistFactory(vaultFactory.address, true)

  const dragoEventful = await deployContract(
    baseAccount,
    network,
    'DragoEventful',
    [authority.address]
  )
  printAddress('DragoEventful', dragoEventful.address)

  logger.info(c.bold('Setting up DragoEventful...'))
  await authority.setDragoEventful(dragoEventful.address)

  const dragoFactory = await deployContract(
    baseAccount,
    network,
    'DragoFactory',
    [dragoRegistry.address, baseAccount, authority.address]
  )
  printAddress('DragoFactory', dragoFactory.address)

  logger.info(c.bold('Whitelisting DragoFactory...'))
  await authority.whitelistFactory(dragoFactory.address, true)

  const rigoToken = await deployContract(baseAccount, network, 'RigoToken', [
    baseAccount,
    baseAccount
  ])
  printAddress('RigoToken', rigoToken.address)

  const proofOfPerformance = await deployContract(
    baseAccount,
    network,
    'ProofOfPerformance',
    [rigoToken.address, baseAccount, dragoRegistry.address]
  )
  printAddress('ProofOfPerformance', proofOfPerformance.address)

  const inflation = await deployContract(baseAccount, network, 'Inflation', [
    rigoToken.address,
    proofOfPerformance.address,
    authority.address
  ])
  printAddress('Inflation', inflation.address)

  await rigoToken.changeMintingAddress(inflation.address)
  printAddress('Setting minting address...', inflation.address)

  const exchangesAuthority = await deployContract(
    baseAccount,
    network,
    'ExchangesAuthority'
  )
  printAddress('ExchangesAuthority', exchangesAuthority.address)

  await authority.setExchangesAuthority(exchangesAuthority.address)
  await exchangesAuthority.setWhitelister(baseAccount, true)

  const aSelfCustody = await deployContract(
    baseAccount,
    network,
    'ASelfCustody'
  )
  printAddress('ASelfCustody', aSelfCustody.address)

  // TODO: remove 0x v0 deprecated contracts
  const exchangeEfx = await deployContract(baseAccount, network, 'ExchangeEfx')
  printAddress('ExchangeEfx', exchangeEfx.address)

  await exchangesAuthority.whitelistExchange(exchangeEfx.address, true)

  const tokenTransferProxy = await deployContract(
    baseAccount,
    network,
    'TokenTransferProxy'
  )
  printAddress('TokenTransferProxy', tokenTransferProxy.address)

  await exchangesAuthority.whitelistTokenTransferProxy(
    tokenTransferProxy.address,
    true
  )

  const wETH9 = await deployContract(baseAccount, network, 'WETH9')
  printAddress('WETH9', wETH9.address)

  await exchangesAuthority.whitelistWrapper(wETH9.address, true)

  const aWeth = await deployContract(baseAccount, network, 'AWeth')
  printAddress('AWeth', aWeth.address)

  await exchangesAuthority.setExchangeAdapter(wETH9.address, aWeth.address)

  const exchangeV1Fork = await deployContract(
    baseAccount,
    network,
    'ExchangeV1Fork',
    [rigoToken.address, tokenTransferProxy.address]
  )
  printAddress('ExchangeV1Fork', exchangeV1Fork.address)

  await tokenTransferProxy.addAuthorizedAddress(exchangeV1Fork.address)
  await exchangesAuthority.whitelistExchange(exchangeV1Fork.address, true)

  // 0x V2 exchange
  const exchange = await deployContract(baseAccount, network, 'Exchange')
  printAddress('Exchange', exchange.address)

  const erc20Proxy = await deployContract(baseAccount, network, 'Erc20Proxy')
  printAddress('Erc20Proxy', erc20Proxy.address)

  await erc20Proxy.addAuthorizedAddress(exchange.address)
  await exchange.registerAssetProxy(erc20Proxy.address)

  const wrapperLockEth = await deployContract(
    baseAccount,
    network,
    'WrapperLockEth',
    ['ETHWrapper', 'ETHW', 18, erc20Proxy.address]
  )
  printAddress('WrapperLockEth', wrapperLockEth.address)

  const wrapperLock = await deployContract(
    baseAccount,
    network,
    'WrapperLock',
    [rigoToken.address, 'Rigo Token Wrapper', 'GRG', 18, erc20Proxy.address, 0]
  )
  printAddress('WrapperLock', wrapperLock.address)

  const navVerifier = await deployContract(baseAccount, network, 'NavVerifier')
  printAddress('NavVerifier', navVerifier.address)

  await authority.setNavVerifier(navVerifier.address)

  const sigVerifier = await deployContract(
    baseAccount,
    network,
    'SigVerifier',
    [exchangesAuthority.address]
  )
  printAddress('SigVerifier', sigVerifier.address)

  await exchangesAuthority.setSignatureVerifier(sigVerifier.address)

  const aEthfinex = await deployContract(baseAccount, network, 'AEthfinex')
  printAddress('AEthfinex', aEthfinex.address)

  await exchangesAuthority.setExchangeAdapter(
    exchangeEfx.address,
    aEthfinex.address
  )

  const aTotlePrimary = await deployContract(
    baseAccount,
    network,
    'ATotlePrimary',
    [
      wETH9.address // TODO: add totle primary as constructor input
    ]
  )
  printAddress('ATotlePrimary', aTotlePrimary.address)

  const totlePrimary = await deployContract(
    baseAccount,
    network,
    'TotlePrimary',
    [tokenTransferProxy.address, baseAccount]
  )
  printAddress('TotlePrimary', totlePrimary.address)

  const zeroExExchangeHandler = await deployContract(
    baseAccount,
    network,
    'ZeroExExchangeHandler',
    [exchange.address, wETH9.address]
  )
  printAddress('ZeroExExchangeHandler', zeroExExchangeHandler.address)

  await exchangesAuthority.setExchangeAdapter(
    totlePrimary.address,
    aTotlePrimary.address
  )

  const faucet = await deployContract(baseAccount, network, 'Faucet', [
    rigoToken.address,
    'GRGFaucet'
  ])
  printAddress('Faucet', faucet.address)

  const hGetDragoData = await deployContract(
    baseAccount,
    network,
    'HGetDragoData'
  )
  printAddress('HGetDragoData', hGetDragoData.address)

  const abiEncoder = await deployContract(baseAccount, network, 'AbiEncoder')
  printAddress('AbiEncoder', abiEncoder.address)

  return {
    AbiEncoder: abiEncoder,
    AEthfinex: aEthfinex,
    ASelfCustody: aSelfCustody,
    ATotlePrimary: aTotlePrimary,
    AWeth: aWeth,
    Authority: authority,
    DragoRegistry: dragoRegistry,
    DragoEventful: dragoEventful,
    DragoFactory: dragoFactory,
    Erc20Proxy: erc20Proxy,
    Exchange: exchange,
    ExchangeEfx: exchangeEfx,
    ExchangeV1Fork: exchangeV1Fork,
    ExchangesAuthority: exchangesAuthority,
    Faucet: faucet,
    HGetDragoData: hGetDragoData,
    NavVerifier: navVerifier,
    RigoToken: rigoToken,
    ProofOfPerformance: proofOfPerformance,
    TotlePrimary: totlePrimary,
    Inflation: inflation,
    SigVerifier: sigVerifier,
    TokenTransferProxy: tokenTransferProxy,
    VaultEventful: vaultEventful,
    VaultFactory: vaultFactory,
    WETH9: wETH9,
    WrapperLockEth: wrapperLockEth,
    WrapperLock: wrapperLock,
    ZeroExExchangeHandler: zeroExExchangeHandler
  }
}
