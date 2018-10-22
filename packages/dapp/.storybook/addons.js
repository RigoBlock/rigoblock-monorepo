import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withOptions } from '@storybook/addon-options'
import '@storybook/addon-knobs/register'
import '@storybook/addon-viewport/register'
import '@storybook/addon-options/register'

addDecorator(withInfo)

withOptions({
  name: 'Rigoblock Dapp UI',
  url: '#',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  sortStoriesByKind: true,
  sidebarAnimations: true,
  enableShortcuts: true
});
