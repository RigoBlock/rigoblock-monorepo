export const tickerSchema = {
  id: '/Tick',
  properties: {
    baseTokenSymbol: { type: 'string' },
    quoteTokenSymbol: { type: 'string' },
    last: { type: 'number' },
},
required: ['baseTokenSymbol', 'quoteTokenSymbol', 'last'],
type: 'object',
};

export const tickersSchema = {
  id: '/tickersSchema',
  type: 'array',
  items: { $ref: '/Tick' },
};