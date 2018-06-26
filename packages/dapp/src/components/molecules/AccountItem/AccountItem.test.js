import { shallow } from 'enzyme'
import AccountItem, { ACCOUNT_ITEM_TYPES } from './AccountItem'
import toJson from 'enzyme-to-json'

const shortVersionProps = {
  provider: 'metamask',
  number: '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d'
}
const fullVersionProps = {
  ...shortVersionProps,
  appearance: ACCOUNT_ITEM_TYPES.FULL
}

describe('AccountItem component', () => {
  it('renders correctly (short version)', () => {
    expect(
      toJson(shallow(createComponentWithProps(AccountItem, shortVersionProps)))
    ).toMatchSnapshot()
  })
  it('renders correctly (full version)', () => {
    expect(
      toJson(shallow(createComponentWithProps(AccountItem, fullVersionProps)))
    ).toMatchSnapshot()
  })
})
