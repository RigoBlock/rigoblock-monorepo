/* GENERATED BY TYPECHAIN VER. 0.1.5 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import {
  TypeChainContract,
  promisify,
  ITxParams,
  IPayableTxParams,
  DeferredTransactionWrapper
} from "./typechain-runtime";

export class Inflation extends TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: false,
        inputs: [
          { name: "_group", type: "address" },
          { name: "_inflationFactor", type: "uint256" }
        ],
        name: "setInflationFactor",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_newPeriod", type: "uint256" }],
        name: "setPeriod",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_thePool", type: "address" }],
        name: "canWithdraw",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "rigoblockDao",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_minimum", type: "uint256" }],
        name: "setMinimumRigo",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_newRigoblock", type: "address" }],
        name: "setRigoblock",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_authority", type: "address" }],
        name: "setAuthority",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "RIGOTOKENADDRESS",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_thePool", type: "address" },
          { name: "_reward", type: "uint256" }
        ],
        name: "mintInflation",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "authority",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_group", type: "address" }],
        name: "getInflationFactor",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_pop", type: "address" }],
        name: "setProofOfPerformance",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "proofOfPerformance",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "period",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { name: "_rigoTokenAddress", type: "address" },
          { name: "_proofOfPerformance", type: "address" },
          { name: "_authority", type: "address" }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<Inflation> {
    const contract = new Inflation(web3, address);
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0") {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get rigoblockDao(): Promise<string> {
    return promisify(this.rawWeb3Contract.rigoblockDao, []);
  }
  public get RIGOTOKENADDRESS(): Promise<string> {
    return promisify(this.rawWeb3Contract.RIGOTOKENADDRESS, []);
  }
  public get authority(): Promise<string> {
    return promisify(this.rawWeb3Contract.authority, []);
  }
  public get proofOfPerformance(): Promise<string> {
    return promisify(this.rawWeb3Contract.proofOfPerformance, []);
  }
  public get period(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.period, []);
  }
  public canWithdraw(_thePool: BigNumber | string): Promise<boolean> {
    return promisify(this.rawWeb3Contract.canWithdraw, [_thePool.toString()]);
  }
  public getInflationFactor(_group: BigNumber | string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.getInflationFactor, [
      _group.toString()
    ]);
  }

  public setInflationFactorTx(
    _group: BigNumber | string,
    _inflationFactor: BigNumber | number
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(
      this,
      "setInflationFactor",
      [_group.toString(), _inflationFactor.toString()]
    );
  }
  public setPeriodTx(
    _newPeriod: BigNumber | number
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "setPeriod", [
      _newPeriod.toString()
    ]);
  }
  public setMinimumRigoTx(
    _minimum: BigNumber | number
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "setMinimumRigo", [
      _minimum.toString()
    ]);
  }
  public setRigoblockTx(
    _newRigoblock: BigNumber | string
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "setRigoblock", [
      _newRigoblock.toString()
    ]);
  }
  public setAuthorityTx(
    _authority: BigNumber | string
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "setAuthority", [
      _authority.toString()
    ]);
  }
  public mintInflationTx(
    _thePool: BigNumber | string,
    _reward: BigNumber | number
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "mintInflation", [
      _thePool.toString(),
      _reward.toString()
    ]);
  }
  public setProofOfPerformanceTx(
    _pop: BigNumber | string
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(
      this,
      "setProofOfPerformance",
      [_pop.toString()]
    );
  }
}
