import './VaultTitle.scss'
import { ETH } from '../../../constants/blockchain'
import { ETH_TO_WEI } from '../../../constants/utils'
import { connect } from 'react-redux'
import Amount, { AMOUNT_SIZES } from '../../molecules/Amount'
import Button from '../../atoms/Button'
import CallToAction from '../../molecules/CallToAction'
import PropTypes from 'prop-types'
import React from 'react'
import Title, { TITLE_SIZES } from '../../atoms/Title'

let VaultTitle = ({ vaultAddress, vaults }) => {
  const selectedVault = vaults[vaultAddress]
  const vaultSupply = selectedVault.totalSupply.div(ETH_TO_WEI)
  return (
    <div className="vault-title">
      <div className="vault-title-header">
        <Title size={TITLE_SIZES.LARGE}>{selectedVault.symbol}</Title>
        <CallToAction>
          {/* TODO: implement logic to deposit or withdraw to/from vault */}
          <Button onClick={() => {}}>Deposit</Button>
          <Button onClick={() => {}}>Withdraw</Button>
        </CallToAction>
      </div>
      <div className="amount-wrapper">
        <Amount
          value={vaultSupply}
          symbol={ETH}
          valueSize={AMOUNT_SIZES.LARGE}
          symbolSize={AMOUNT_SIZES.SMALL}
        />
      </div>
    </div>
  )
}

VaultTitle.propTypes = {
  vaultAddress: PropTypes.string.isRequired,
  vaults: PropTypes.object.isRequired
}

VaultTitle = connect(state => {
  const { currentAccount } = state.preferences
  return {
    vaults: currentAccount
      ? state.blockChain.accounts[currentAccount].vaults
      : {}
  }
})(VaultTitle)

export default VaultTitle
