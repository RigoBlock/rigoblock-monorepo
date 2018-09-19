import { latestTime } from './latestTime'
import web3 from '../web3'

// Increases ganache time by the passed duration in seconds
export const increaseTime = async duration => {
  // const id = Date.now()
  return await web3.evm.evmIncreaseTime(duration)
}

// export const increaseTime = async (duration) => {
//   const id = Date.now()
//   console.log(duration)
//   return new Promise((resolve, reject) => {
//       web3.currentProvider.send({
//           jsonrpc: '2.0',
//           method: 'evm_increaseTime',
//           params: [duration],
//           id: id,
//       }, err1 => {
//           if (err1) return reject(err1)
//           console.log('second')
//           web3.currentProvider.send({
//               jsonrpc: '2.0',
//               method: 'evm_mine',
//               params: [],
//               id: id + 1,
//           }, (err2, res) => {
//               return err2 ? reject(err2) : resolve(res)
//           })
//       })
//   })
// }

/**
 * Beware that due to the need of calling two separate ganache methods and rpc calls overhead
 * it's hard to increase time precisely to a target point so design your test to tolerate
 * small fluctuations from time to time.
 *
 * @param target time in seconds
 */
export const increaseTimeTo = async target => {
  let now = await latestTime()
  if (target < now)
    throw Error(
      `Cannot increase current time(${now}) to a moment in the past(${target})`
    )
  let diff = target - now
  return increaseTime(diff)
}

export const duration = {
  seconds: function(val) {
    return val
  },
  minutes: function(val) {
    return val * this.seconds(60)
  },
  hours: function(val) {
    return val * this.minutes(60)
  },
  days: function(val) {
    return val * this.hours(24)
  },
  weeks: function(val) {
    return val * this.days(7)
  },
  years: function(val) {
    return val * this.days(365)
  }
}
