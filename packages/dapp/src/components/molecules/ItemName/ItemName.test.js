import { shallow } from 'enzyme'
import ItemName from './ItemName.jsx'
import toJson from 'enzyme-to-json'

const props = { name: 'Rocksolid Vault', symbol: 'VLT' }

describe('ItemName component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ItemName, props)))
    ).toMatchSnapshot()
  })
})
