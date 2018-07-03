import './VaultList.scss'
import { BigNumber } from 'bignumber.js'
import { ETHTOMICRO } from '../../../constants/utils'
import { connect } from 'react-redux'
import ListPanel from '../../organisms/ListPanel'
import PropTypes from 'prop-types'
import React from 'react'

let vaultList = ({ vaults }) => {
  if (!Object.keys(vaults).length) {
    return (
      <div className="vaultList">
        <ListPanel title="Vaults" items={[]} />
      </div>
    )
  }
  const vaultsList = Object.keys(vaults).map(vault => {
    const { name, symbol, totalSupply } = vaults[vault]
    const ethSupply = totalSupply
      ? totalSupply.div(ETHTOMICRO)
      : new BigNumber(0)
    return {
      itemName: name,
      itemSymbol: symbol,
      itemValue: ethSupply
    }
  })
  return (
    <div className="vault-list">
      <ListPanel title="Vaults" items={vaultsList} />
    </div>
  )
}

vaultList.propTypes = {
  vaults: PropTypes.object
}

vaultList.defaultProps = {
  vaults: {}
}

vaultList = connect(state => {
  const { currentAccount } = state.user.preferences
  return {
    vaults: currentAccount
      ? state.user.blockChain.accounts[currentAccount].vaults
      : {}
  }
})(vaultList)

export default vaultList
