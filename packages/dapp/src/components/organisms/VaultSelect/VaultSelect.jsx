import './VaultSelect.scss'
import * as ROUTES from '../../../constants/routes'
import { BigNumber } from 'bignumber.js'
import { ETH_TO_WEI } from '../../../constants/utils'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import List from '../../organisms/List'
import ListItem from '../../molecules/ListItem'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import routerActions from '../../../actions/router-actions'

let vaultSelect = ({ vaults, dispatch, location }) => {
  // redirect to first vault if there is one
  if (
    (location === ROUTES.VAULTS || location === `${ROUTES.VAULTS}/`) &&
    Object.keys(vaults).length
  ) {
    const firstVaultAddress = Object.keys(vaults).shift()
    const firstVaultId = vaults[firstVaultAddress].id
    return <Redirect to={`${ROUTES.VAULTS}/${firstVaultId}`} />
  }

  // redirect to to /vaults if no vaults are present and we try to access
  // a vault's address
  if (location !== ROUTES.VAULTS && !Object.keys(vaults).length) {
    return <Redirect to={ROUTES.VAULTS} />
  }
  // TODO: implement a 404 page if no vaults are present
  if (!Object.keys(vaults).length) {
    return <div className="vault-select">Nothing here!</div>
  }

  const handleClick = ({ target }) => {
    return location === `${ROUTES.VAULTS}/${target.id}`
      ? null
      : dispatch(routerActions.navigateToVault(target.id))
  }

  let vaultsList = Object.values(vaults).map(
    ({ name, symbol, totalSupply, id }) => ({
      itemName: name,
      itemSymbol: symbol,
      itemValue: totalSupply ? totalSupply.div(ETH_TO_WEI) : new BigNumber('0'),
      id,
      onClick: handleClick
    })
  )

  vaultsList = vaultsList.map(vault => ({
    ...vault,
    className: classNames({
      active: location === `${ROUTES.VAULTS}/${vault.id.toString()}`
    })
  }))

  return (
    <List Component={ListItem} data={vaultsList} className="vault-select" />
  )
}

vaultSelect.propTypes = {
  vaults: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired
}

vaultSelect.defaultProps = {
  vaults: {}
}

vaultSelect = connect(state => {
  const { currentAccount } = state.preferences
  return {
    vaults: currentAccount
      ? state.blockChain.accounts[currentAccount].vaults
      : {},
    location: state.routing.location.pathname
  }
})(vaultSelect)

export default vaultSelect
