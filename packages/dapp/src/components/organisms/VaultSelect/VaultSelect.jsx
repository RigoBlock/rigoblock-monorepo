import './VaultSelect.scss'
import * as ROUTES from '../../../constants/routes'
import { BigNumber } from 'bignumber.js'
import { ETH_TO_WEI } from '../../../constants/utils'
import { MANAGER } from '../../../constants/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button, { BUTTON_TYPES } from '../../atoms/Button'
import CreateVaultModal from '../CreateVaultModal'
import List from '../../organisms/List'
import ListItem from '../../molecules/ListItem'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import globalActions from '../../../actions/global-actions'
import routerActions from '../../../actions/router-actions'

let vaultSelect = ({
  vaults,
  location,
  userType,
  openModal,
  navigateToVault
}) => {
  // TODO: remove this and implement a correct page
  const handleVaultClick = ({ target }) => {
    return location === `${ROUTES.VAULTS}/${target.id}`
      ? null
      : navigateToVault(target.id)
  }

  const handleButtonClick = () => openModal(CreateVaultModal)

  if (!vaults) {
    return (
      <Button appearance={BUTTON_TYPES.INVERTED} onClick={handleButtonClick}>
        New Vault
      </Button>
    )
  }

  let vaultsList = Object.values(vaults).map(
    ({ name, symbol, totalSupply, id }) => ({
      itemName: name,
      itemSymbol: symbol,
      itemValue: totalSupply ? totalSupply.div(ETH_TO_WEI) : new BigNumber('0'),
      id,
      onClick: handleVaultClick
    })
  )

  vaultsList = vaultsList.map(vault => ({
    ...vault,
    className: classNames({
      active: location === `${ROUTES.VAULTS}/${vault.id.toString()}`
    })
  }))

  return userType === MANAGER ? (
    <div className="vault-select">
      <Button appearance={BUTTON_TYPES.INVERTED} onClick={handleButtonClick}>
        New Vault
      </Button>
      <List Component={ListItem} data={vaultsList} />
    </div>
  ) : (
    <div className="vault-select">
      <List Component={ListItem} data={vaultsList} />
    </div>
  )
}

vaultSelect.propTypes = {
  vaults: PropTypes.object,
  openModal: PropTypes.func.isRequired,
  navigateToVault: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired
}

vaultSelect.defaultProps = {
  vaults: {}
}

vaultSelect = connect(
  state => {
    const { currentAccount } = state.preferences
    return {
      vaults:
        currentAccount &&
        get(state, `blockChain.accounts[${currentAccount}].vaults`, null),
      location: state.routing.location.pathname,
      userType: state.preferences.type
    }
  },
  dispatch => ({
    ...bindActionCreators(globalActions, dispatch),
    ...bindActionCreators(routerActions, dispatch)
  })
)(vaultSelect)

export default vaultSelect
