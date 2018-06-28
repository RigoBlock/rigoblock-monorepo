import './VaultSelect.scss'
import * as ROUTES from '../../../constants/routes'
import { connect } from 'react-redux'
import List from '../../organisms/List'
import ListItem from '../../molecules/ListItem'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import routerActions from '../../../actions/router-actions'

import React from 'react'

let vaultSelect = ({ vaults, dispatch, pathname }) => {
  if (!Object.keys(vaults).length) {
    return 'Nothing here!'
  }
  const handleClick = ({ target }) =>
    dispatch(routerActions.goToVault(target.id))

  let vaultsList = Object.keys(vaults).map(vault => {
    const { name, symbol, totalSupply, id } = vaults[vault]
    return {
      itemName: name,
      itemSymbol: symbol,
      itemValue: totalSupply,
      id,
      onClick: handleClick
    }
  })

  vaultsList = vaultsList.map(vault => ({
    ...vault,
    className: classNames({
      active: pathname === `${ROUTES.VAULTS}/${vault.id}`
    })
  }))

  return (
    <List Component={ListItem} data={vaultsList} className="vault-select" />
  )
}

vaultSelect.propTypes = {
  vaults: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired
}

vaultSelect.defaultProps = {
  vaults: {}
}

vaultSelect = connect(state => {
  const { currentAccount } = state.user.preferences
  return {
    vaults: state.user.blockChain.accounts[currentAccount].vaults,
    location: state.routing.location.pathname
  }
})(vaultSelect)

export default vaultSelect
