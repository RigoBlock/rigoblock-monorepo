import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '../../atoms/Tooltip'
import './PanelHeader.scss'

const PanelHeader = props => {
  const { tooltip, title } = props
  const tooltipComponent = tooltip && <Tooltip type={'help'} />

  return (
    <div className="panel-header">
      <h1>{title}</h1>
      {tooltipComponent}
    </div>
  )
}

PanelHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string
}

PanelHeader.defaultProps = {
  tooltip: null
}

export default PanelHeader
