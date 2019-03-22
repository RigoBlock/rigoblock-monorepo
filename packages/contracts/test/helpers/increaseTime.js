import { latestTime } from './latestTime'
import web3 from '../web3'

export const increaseTime = async duration => {
  return await web3.evm.evmIncreaseTime(duration)
  //return await web3.make_request("evm_increaseTime", [duration]) // new web3 function
}

// Beware that due to the need of calling two separate ganache methods and rpc calls overhead
// it's hard to increase time precisely to a target point so design your test to tolerate
// small fluctuations from time to time.
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
