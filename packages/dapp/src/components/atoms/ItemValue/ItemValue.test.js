import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ItemValue from './ItemValue.jsx'

const props = { itemValue: 12489.51354 }

describe('ItemValue component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ItemValue, props)))
    ).toMatchSnapshot()
  })
})
