import { BigNumber } from 'bignumber.js'
import { shallow } from 'enzyme'
import ItemValue, { roundProps } from './ItemValue.jsx'
import toJson from 'enzyme-to-json'

const props = { itemValue: new BigNumber(12489.51354), precision: 2 }

describe('ItemValue component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ItemValue, props)))
    ).toMatchSnapshot()
  })

  describe('roundProps function', () => {
    it('correctly rounds to the correct number of decimals', () => {
      expect(roundProps(props)).toEqual({ itemValue: '12,489.51' })
      expect(roundProps({ ...props, precision: 4 })).toEqual({
        itemValue: '12,489.5135'
      })
      expect(roundProps({ ...props, precision: 0 })).toEqual({
        itemValue: '12,489'
      })
    })
  })
})
