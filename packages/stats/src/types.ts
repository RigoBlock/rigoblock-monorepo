export interface EventLog {
  event: string
  address: string
  returnValues: any
  logIndex: number
  transactionIndex: number
  transactionHash: string
  blockHash: string
  blockNumber: number
  raw?: { data: string; topics: string[] }
}

export type BlockType = 'latest' | 'pending' | 'genesis' | number
