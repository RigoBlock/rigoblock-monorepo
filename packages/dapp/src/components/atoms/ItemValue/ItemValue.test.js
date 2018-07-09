import { BigNumber } from 'bignumber.js'
import { shallow } from 'enzyme'
import ItemValue, { roundProps } from './ItemValue.jsx'
import toJson from 'enzyme-to-json'

const props = { itemValue: new BigNumber('12489.51354'), precision: 2 }

describe('ItemValue component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ItemValue, props)))
    ).toMatchSnapshot()
  })

  describe('roundProps function', () => {
    it('correctly rounds to 2 decimals', () => {
      expect(roundProps(props)).toEqual({ itemValue: '12,489.51' })
    })
    it('correctly rounds to 4 decimals', () => {
      expect(roundProps({ ...props, precision: 4 })).toEqual({
        itemValue: '12,489.5135'
      })
    })
    it('correctly rounds to 0 decimals', () => {
      expect(roundProps({ ...props, precision: 0 })).toEqual({
        itemValue: '12,489'
      })
    })
    it('throws error if precision is < 0', () => {
      const errorWrapper = () => roundProps({ ...props, precision: -1 })
      expect(errorWrapper).toThrowErrorMatchingSnapshot()
    })
  })
})
