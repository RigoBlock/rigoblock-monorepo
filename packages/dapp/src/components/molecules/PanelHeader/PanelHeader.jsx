import './PanelHeader.scss'
import Icon from '../../atoms/Icon'
import PropTypes from 'prop-types'
import React from 'react'

const PanelHeader = ({ tooltip, title }) => {
  const tooltipComponent = tooltip && (
    <Icon type={'help'} tooltipText={tooltip} />
  )

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
