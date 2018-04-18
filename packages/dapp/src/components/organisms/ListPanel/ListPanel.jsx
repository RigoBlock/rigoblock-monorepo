import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../../molecules/ContentWrapper'
import List from '../../organisms/List'

const ListPanel = props => {
  const { title, items, tooltip } = props
  return (
    <ContentWrapper title={title} tooltip={tooltip}>
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
