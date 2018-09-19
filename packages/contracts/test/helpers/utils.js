function getParamFromTxEvent(
  transaction,
  paramName,
  contractFactory,
  eventName
) {
  expect(transaction).toBeObject()
  let logs = transaction.logs
  if (eventName != null) {
    logs = logs.filter(l => l.event === eventName)
  }
  expect(logs.length).toBe(1)
  let param = logs[0].args[paramName]
  if (contractFactory != null) {
    let contract = contractFactory.at(param)
    expect(contract).toBeObject()
    // assert.isObject(contract, `getting ${paramName} failed for ${param}`)
    return contract
  } else {
    return param
  }
}

Object.assign(exports, {
  getParamFromTxEvent
})
