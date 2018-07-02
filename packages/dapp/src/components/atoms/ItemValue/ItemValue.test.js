import { BigNumber } from 'bignumber.js'
import { shallow } from 'enzyme'
import ItemValue from './ItemValue.jsx'
import toJson from 'enzyme-to-json'

const props = { itemValue: new BigNumber(12489.51354) }

describe('ItemValue component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ItemValue, props)))
    ).toMatchSnapshot()
  })
})
