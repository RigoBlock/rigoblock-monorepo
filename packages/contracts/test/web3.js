import { NETWORKS } from '../constants'
import Web3 from 'web3'

let web3 = new Web3(new Web3.providers.HttpProvider(NETWORKS[0]))

web3.extend({
  property: 'evm',
  methods: [
    {
      name: 'evmIncreaseTime',
      call: 'evm_increaseTime',
      params: 1
    }
  ]
})

export default web3
