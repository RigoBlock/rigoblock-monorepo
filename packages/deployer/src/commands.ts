import { Compiler } from './compiler'
import { CompilerOptions, DeployerOptions } from './utils/types'
import { Deployer } from './deployer'

export const commands = {
  async compileAsync(opts: CompilerOptions): Promise<void> {
    const compiler = new Compiler(opts)
    await compiler.compileAsync()
  },
  async deployAsync(
    contractName: string,
    args: any[],
    opts: DeployerOptions
  ): Promise<void> {
    const deployer = new Deployer(opts)
    await deployer.deployAndSaveAsync(contractName, args)
  }
}
