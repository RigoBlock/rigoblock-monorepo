export abstract class ContractExtension {
  public static address: string

  static isDeployed() {
    return !!this.address
  }
}
