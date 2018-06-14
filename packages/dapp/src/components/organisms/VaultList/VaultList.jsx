import './VaultList.scss'
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
    return {
      itemName: name,
      itemSymbol: symbol,
      itemValue: totalSupply
    }
  })
  return (
    <div className="vaultList">
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
  return currentAccount
    ? {
        vaults: state.user.blockChain.accounts[currentAccount].vaults
      }
    : {
        vaults: {}
      }
})(vaultList)

export default vaultList
