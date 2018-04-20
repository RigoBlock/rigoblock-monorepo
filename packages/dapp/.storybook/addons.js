import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import '@storybook/addon-viewport/register'

addDecorator((story, context) => withInfo('')(story)(context))
