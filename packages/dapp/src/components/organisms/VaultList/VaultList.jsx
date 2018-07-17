import './VaultList.scss'
import { BigNumber } from 'bignumber.js'
import { ETH_TO_WEI } from '../../../constants/utils'
import { connect } from 'react-redux'
import ListPanel from '../../organisms/ListPanel'
import PropTypes from 'prop-types'
import React from 'react'

let vaultList = ({ vaults }) => {
  if (!Object.keys(vaults).length) {
    return (
      <div className="vault-list">
        <ListPanel title="Vaults" items={[]} />
      </div>
    )
  }
  const vaultsList = Object.values(vaults).map(
    ({ name, symbol, totalSupply }) => ({
      itemName: name,
      itemSymbol: symbol,
      itemValue: totalSupply ? totalSupply.div(ETH_TO_WEI) : new BigNumber('0')
    })
  )
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
  const { currentAccount } = state.preferences
  return {
    vaults: currentAccount
      ? state.blockChain.accounts[currentAccount].vaults
      : {}
  }
})(vaultList)

export default vaultList
