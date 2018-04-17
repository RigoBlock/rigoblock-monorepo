import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ItemName from './ItemName.jsx'

const props = { name: 'Rocksolid Vault', symbol: 'VLT' }

describe('ItemName component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ItemName, props)))
    ).toMatchSnapshot()
  })
})
