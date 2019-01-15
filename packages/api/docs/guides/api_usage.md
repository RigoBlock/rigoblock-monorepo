# API usage

It is recommended to have a single file exporting the API class instance, to be able to reuse the same instance throughout your application.

```javascript
// api.js
import Api from '@rigoblock/api'

export default new Api()
```

## Creating a pool

Instantiate the *DragoFactory* contract

```javascript
import api from './api.js'

const createDrago = async () => {
  const dragoFactory = await api.contract.DragoFactory.createAndValidate()
}
```

