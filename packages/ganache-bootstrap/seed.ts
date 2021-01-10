import { seedVaults } from './seedVaults'

const task = async network => {
  await seedVaults(network)
}

export default task
