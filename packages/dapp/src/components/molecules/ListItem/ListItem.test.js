import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ListItem from './ListItem.jsx'

const props = { itemName: 'Rocksolid Vault', itemSymbol: 'VLT' }

describe('ListItem component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ListItem, props)))
    ).toMatchSnapshot()
  })
})
