import './VaultTitle.scss'
import { ETH } from '../../../constants/blockchain'
import { ETH_TO_WEI } from '../../../constants/utils'
import Amount, { AMOUNT_SIZES } from '../../molecules/Amount'
import Button from '../../atoms/Button'
import CallToAction from '../../molecules/CallToAction'
import PropTypes from 'prop-types'
import React from 'react'
import Title, { TITLE_SIZES } from '../../atoms/Title'

const VaultTitle = ({ vault }) => {
  const vaultSupply = vault.totalSupply.div(ETH_TO_WEI)
  return (
    <div className="vault-title">
      <div className="vault-title-header">
        <Title size={TITLE_SIZES.LARGE}>{vault.symbol}</Title>
        <CallToAction>
          {/* TODO: add action to open modal */}
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
  vault: PropTypes.object.isRequired
}

export default VaultTitle
