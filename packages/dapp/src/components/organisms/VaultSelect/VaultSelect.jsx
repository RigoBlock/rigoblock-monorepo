import './VaultSelect.scss'
import * as ROUTES from '../../../constants/routes'
import { BigNumber } from 'bignumber.js'
import { ETHTOMICRO } from '../../../constants/utils'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import List from '../../organisms/List'
import ListItem from '../../molecules/ListItem'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import routerActions from '../../../actions/router-actions'

let vaultSelect = ({ vaults, dispatch, location }) => {
  // TODO: remove this and implement a correct page
  if (!Object.keys(vaults).length) {
    return <div className="vault-select">Nothing here!</div>
  }

  if (location === ROUTES.VAULTS) {
    const firstVaultAddress = Object.keys(vaults).shift()
    const firstVaultId = vaults[firstVaultAddress].id
    return <Redirect to={`${ROUTES.VAULTS}/${firstVaultId}`} />
  }

  const handleClick = ({ target }) => {
    return location === `${ROUTES.VAULTS}/${target.id}`
      ? null
      : dispatch(routerActions.navigateToVault(target.id))
  }

  let vaultsList = Object.keys(vaults).map(vault => {
    const { name, symbol, totalSupply, id } = vaults[vault]
    const ethSupply = totalSupply
      ? totalSupply.div(ETHTOMICRO)
      : new BigNumber('0')
    return {
      itemName: name,
      itemSymbol: symbol,
      itemValue: ethSupply,
      id,
      onClick: handleClick
    }
  })

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
