# fetchInfo

## _initialData_ properties:

- symbol

## Steps

- Fetch the token overview and social data, overview including: **whitepaper**, **website url**, **status** (eg. trading or ICO incoming), **blockchain**, **team**, **country of origin**, **tokens sale date** and **github stats**.
- Save the data on the CouchDB database **"tokens_info"** with format `<tokenSymbol>::<date>`, date being an ISO string.
