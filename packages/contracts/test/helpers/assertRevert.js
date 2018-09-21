export default async promise => {
  try {
    await promise
    throw new Error('')
  } catch (error) {
    const revertFound = error.message.search('revert') >= 0
    expect(revertFound).toBe(true)
  }
}
