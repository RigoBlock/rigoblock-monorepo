# Feature Tests

We are using [CodeceptJS](https://codecept.io/helpers/Puppeteer/ "Puppeteer Helper Guide") for feature tests. To test the DApp we wrote a custom codecept helper that automatically injects `window.web3` into Puppeteer's page instance.

The RigoBlock API gets instantiated by the `global.init` action, and since we need to wait for web3 to be injected we modified our code so that it checks for a `REACT_APP_TEST` environment variable.

```javascript
const init = () => store.dispatch(globalActions.init())

process.env.REACT_APP_TEST ? (window.init = init) : init()
```

If the environment variable is true, then the global.init action can be fired invoking `window.init()`, otherwise it will fire it immediately as normal. This enables us to fire the action manually after we injected web3.

```javascript
class Web3Puppeteer extends Helper {
  async _before() {
    await this.helpers['Puppeteer'].amOnPage('/login')
    await this.inject()
    await this.helpers['Puppeteer'].page.waitForNavigation()
  }
  async inject() {
    const web3Raw = fs.readFileSync('../../node_modules/web3/dist/web3.min.js')
    const page = this.helpers['Puppeteer'].page
    await page.evaluate(function(web3Raw) {
      eval(web3Raw)
      window.web3 = new window.Web3(
        new window.Web3.providers.HttpProvider('http://localhost:8545/node')
      )
      window.init()
    }, web3Raw)
  }
}
```
The `_before` hook is executed before each test:
- it navigates to the login page
- calls the `inject()` function, which evaluates web3 in the page context and then calls the `window.init()` function
- `waitForNavigation()` waits for a Javascript `load` event

This results in every test first navigating to the login page, then being redirected to Dashboard page from the Login epic.

When writing tests we are not able to use puppeteer's `amOnPage()` method as we would lose the variable window.web3, we instead need to navigate from one page to another clicking on links.
>Note that in the case of the Login page feature test we directly navigate to the '/login' url, intentionally resetting window.web3, otherwise we wouldn't be able to stay on the page without being redirected immediately.
