import './PanelHeader.scss'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip from '../../atoms/TooltipIcon'

const PanelHeader = ({ tooltip, title }) => {
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
