module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_directory: './src',
  contracts_build_directory: './artifacts',
  compilers: {
    solc: {
      parser: 'solcjs', // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000000
        }
      }
    }
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    }
  }
}
