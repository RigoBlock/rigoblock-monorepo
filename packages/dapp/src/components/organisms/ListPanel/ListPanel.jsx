import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../../molecules/ContentWrapper'
import PanelHeader from '../../molecules/PanelHeader'
import List from '../../organisms/List'

const ListPanel = props => {
  const { title, items, tooltip } = props
  const header = <PanelHeader title={title} tooltip={tooltip} />
  return (
    <ContentWrapper header={header}>
      <List items={items} />
    </ContentWrapper>
  )
}

ListPanel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  tooltip: PropTypes.string
}

ListPanel.defaultProps = {
  tooltip: null
}

export default ListPanel
