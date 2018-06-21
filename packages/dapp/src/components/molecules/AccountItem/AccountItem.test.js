import { shallow } from 'enzyme'
import AccountItem from './AccountItem'
import toJson from 'enzyme-to-json'

const props = {
  provider: 'metamask',
  number: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
}

describe('AccountItem component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(AccountItem, props)))
    ).toMatchSnapshot()
  })
})
