# fetchInfo

## _initialData_ properties:

- symbol

## Steps

- Fetch token's news list from CryptoPanic and TokenMarket. Obtain source urls for each of them.
- Save the data on the CouchDB database **"tokens_news"** with the news url being the key and **title**, **date** and **token** being the data.
