import { shallow } from 'enzyme'
import AccountItem from './AccountItem'
import toJson from 'enzyme-to-json'

const props = {
  provider: 'metamask',
  number: '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d'
}

describe('AccountItem component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(AccountItem, props)))
    ).toMatchSnapshot()
  })
})
