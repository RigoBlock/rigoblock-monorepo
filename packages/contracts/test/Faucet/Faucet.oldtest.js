import { BigNumber } from 'bignumber.js'
import { duration, increaseTimeTo } from '../helpers/increaseTime'
import { latestTime } from '../helpers/latestTime'

const contractName = 'Faucet'
let faucet
let rigoToken
const balance = 2000000000000000000000
const amount = 3000000000000000000000
const oneToken = 1000000000000000000

describeContract(contractName, () => {
  beforeAll(async () => {
    faucet = baseContracts['Faucet']
    rigoToken = baseContracts['RigoToken']
  })

  describe.skip('Faucet Contract - Deploys Correctly', () => {
    const faucet_name = 'GRGFaucet'

    it('Correctly sets Faucet owner', async () => {
      const ownerAddress = await faucet.owner()
      expect(ownerAddress).toBe(accounts[0])
    })

    it('Correctly sets Faucet contract name', async () => {
      const faucetName = await faucet.faucetName()
      expect(faucetName).toBe(faucet_name)
    })

    it('Correctly sets Faucet GRG token address', async () => {
      const faucetInstance = await faucet.tokenInstance()
      expect(faucetInstance).toBe(rigoToken.address)
    })

    it('Correctly sets Faucet status to true after contract instance', async () => {
      const faucetStatus = await faucet.faucetStatus()
      expect(faucetStatus).toBe(true)
    })
  })

  describe.skip('Faucet Contract - receive and withdraw', () => {
    it('Correctly receive and withdraw tokens', async () => {
      let faucetBalance

      // Donor sends GRG to faucet
      await rigoToken.transfer(faucet.address, amount)
      faucetBalance = await rigoToken.balanceOf(faucet.address)
      expect(new BigNumber(faucetBalance).toFixed()).toBe(
        new BigNumber(amount).toFixed()
      )

      // Donor withdraws GRG from faucet
      await faucet.withdraw.sendTransactionAsync(amount, {
        from: accounts[0]
      })
      faucetBalance = await rigoToken.balanceOf(faucet.address)
      expect(new BigNumber(faucetBalance).toFixed()).toBe(
        new BigNumber(0).toFixed()
      )

      // Non owners cannot withdraw GRG from faucet
      await expect(
        faucet.withdraw.sendTransactionAsync(amount, {
          from: accounts[1]
        })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe.skip('Faucet Contract - drips 1 Token', () => {
    it('Correctly drips 1 Token', async () => {
      // Donor sends GRG to faucet
      await rigoToken.transfer(faucet.address, amount)
      let faucetBalance = await rigoToken.balanceOf(faucet.address)
      expect(new BigNumber(faucetBalance).toFixed()).toBe(
        new BigNumber(amount).toFixed()
      )

      // Faucet drips 1 token
      await faucet.drip1Token.sendTransactionAsync({
        from: accounts[1]
      })
      let dripAccountBalance = await rigoToken.balanceOf(accounts[1])
      expect(new BigNumber(dripAccountBalance).toFixed()).toBe(
        new BigNumber(oneToken).toFixed()
      )
      let faucetBalanceDrip = await rigoToken.balanceOf(faucet.address)
      expect(new BigNumber(faucetBalanceDrip).toFixed()).toBe(
        new BigNumber(faucetBalance).minus(oneToken).toFixed()
      )

      // TODO: add test for events. This is an example.
      // let txReceipt = await web3.eth.getTransactionReceipt(txHash)
      // eventEmitted = utils.getParamFromTxEvent(txReceipt, 'receiver', null, 'OneTokenSent')
      // expect(eventEmitted).toBe(accounts[0])

      //check previous sender is now locked from requesting again
      await expect(
        faucet.drip1Token.sendTransactionAsync({
          from: accounts[1]
        })
      ).rejects.toThrowErrorMatchingSnapshot()

      //advancing 48 hour in time
      let lastBlockTimestamp = await latestTime()
      const unlockTime = lastBlockTimestamp + duration.hours(48)
      await increaseTimeTo(unlockTime)

      //previous sender can now request again
      await faucet.drip1Token.sendTransactionAsync({
        from: accounts[1]
      })
      dripAccountBalance = await rigoToken.balanceOf(accounts[1])
      expect(new BigNumber(dripAccountBalance).toFixed()).toBe(
        new BigNumber(oneToken).multipliedBy(2).toFixed()
      )
      faucetBalanceDrip = await rigoToken.balanceOf(faucet.address)
      expect(new BigNumber(faucetBalanceDrip).toFixed()).toBe(
        new BigNumber(faucetBalance).minus(oneToken * 2).toFixed()
      )
    })
  })

  describe.skip('Faucet Contract - Faucet OFF and ON', () => {
    it('Correctly turns Faucet OFF and ON', async () => {
      // Turn faucet OFF
      await faucet.turnFaucetOff.sendTransactionAsync({
        from: accounts[0]
      })

      let faucetStatus = await faucet.faucetStatus()
      expect(faucetStatus).toBe(false)

      // Cannot turn faucet OFF again
      await expect(
        faucet.turnFaucetOff.sendTransactionAsync({
          from: accounts[0]
        })
      ).rejects.toThrowErrorMatchingSnapshot()

      faucetStatus = await faucet.faucetStatus()
      expect(faucetStatus).toBe(false)

      //Donor sends GRG to faucet
      await rigoToken.transfer(faucet.address, balance)

      // Cannot drip if faucet is off
      await expect(
        faucet.drip1Token.sendTransactionAsync({
          from: accounts[0]
        })
      ).rejects.toThrowErrorMatchingSnapshot()

      // Turn faucet ON
      await faucet.turnFaucetOn.sendTransactionAsync({
        from: accounts[0]
      })

      faucetStatus = await faucet.faucetStatus()
      expect(faucetStatus).toBe(true)

      // Cannot turn faucet ON again
      await expect(
        faucet.turnFaucetOn.sendTransactionAsync({
          from: accounts[0]
        })
      ).rejects.toThrowErrorMatchingSnapshot()

      faucetStatus = await faucet.faucetStatus()
      expect(faucetStatus).toBe(true)
    })

    it('Non owner cannot turn faucet OFF/ON', async () => {
      // Non owner cannot turn OFF
      await expect(
        faucet.turnFaucetOff.sendTransactionAsync({
          from: accounts[1]
        })
      ).rejects.toThrowErrorMatchingSnapshot()

      // Non owner cannot turn ON
      await expect(
        faucet.turnFaucetOff.sendTransactionAsync({
          from: accounts[1]
        })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })
})
