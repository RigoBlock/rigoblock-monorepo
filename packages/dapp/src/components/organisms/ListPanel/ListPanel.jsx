import ContentWrapper from '../../molecules/ContentWrapper'
import List from '../../organisms/List'
import ListItem from '../../molecules/ListItem'
import PanelHeader from '../../molecules/PanelHeader'
import PropTypes from 'prop-types'
import React from 'react'

const ListPanel = ({ title, items, tooltip }) => {
  const header = <PanelHeader title={title} tooltip={tooltip} />
  return (
    <ContentWrapper header={header}>
      <List items={items} />
    </ContentWrapper>
  )
}

ListPanel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(ListItem.propTypes)).isRequired,
  tooltip: PropTypes.string
}

ListPanel.defaultProps = {
  tooltip: null
}

export default ListPanel
