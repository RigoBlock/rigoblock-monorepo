import { BigNumber } from 'bignumber.js'
import { shallow } from 'enzyme'
import List from './List.jsx'
import ListItem from '../../molecules/ListItem'
import toJson from 'enzyme-to-json'

const props = {
  Component: ListItem,
  data: [
    {
      id: new BigNumber('1'),
      itemName: 'Rocksolid Vault',
      itemSymbol: 'VLT',
      value: new BigNumber('12489.51323')
    }
  ]
}

describe('List component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(List, props)))
    ).toMatchSnapshot()
  })
})
