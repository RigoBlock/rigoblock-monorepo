import { shallow } from 'enzyme'
import AccountSummary from './AccountSummary'
import toJson from 'enzyme-to-json'

const props = {
  provider: 'metamask',
  number: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
  balance: '57999999999960203063'
}

describe('AccountSummary component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(AccountSummary, props)))
    ).toMatchSnapshot()
  })
})
