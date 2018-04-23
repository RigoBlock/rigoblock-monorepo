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

export class DragoFactory extends TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: false,
        inputs: [{ name: "_new", type: "address" }],
        name: "setOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_dragoDao", type: "address" }],
        name: "setBeneficiary",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getStorage",
        outputs: [
          { name: "dragoDao", type: "address" },
          { name: "version", type: "string" },
          { name: "nextDragoId", type: "uint256" }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_targetDrago", type: "address" },
          { name: "_dragoDao", type: "address" }
        ],
        name: "setTargetDragoDao",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getRegistry",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_fee", type: "uint256" }],
        name: "setFee",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getEventful",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [],
        name: "drain",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_newRegistry", type: "address" }],
        name: "setRegistry",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "getDragosByAddress",
        outputs: [{ name: "", type: "address[]" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_newDragoDao", type: "address" }],
        name: "changeDragoDao",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_name", type: "string" },
          { name: "_symbol", type: "string" }
        ],
        name: "createDrago",
        outputs: [{ name: "success", type: "bool" }],
        payable: true,
        stateMutability: "payable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "VERSION",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { name: "_registry", type: "address" },
          { name: "_dragoDao", type: "address" },
          { name: "_authority", type: "address" }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: "name", type: "string" },
          { indexed: false, name: "symbol", type: "string" },
          { indexed: true, name: "drago", type: "address" },
          { indexed: true, name: "owner", type: "address" },
          { indexed: false, name: "dragoId", type: "uint256" }
        ],
        name: "DragoCreated",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "old", type: "address" },
          { indexed: true, name: "current", type: "address" }
        ],
        name: "NewOwner",
        type: "event"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<DragoFactory> {
    const contract = new DragoFactory(web3, address);
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0") {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get getRegistry(): Promise<string> {
    return promisify(this.rawWeb3Contract.getRegistry, []);
  }
  public get getEventful(): Promise<string> {
    return promisify(this.rawWeb3Contract.getEventful, []);
  }
  public get owner(): Promise<string> {
    return promisify(this.rawWeb3Contract.owner, []);
  }
  public get VERSION(): Promise<string> {
    return promisify(this.rawWeb3Contract.VERSION, []);
  }
  public getStorage(): Promise<[string, string, BigNumber]> {
    return promisify(this.rawWeb3Contract.getStorage, []);
  }
  public getDragosByAddress(_owner: BigNumber | string): Promise<string[]> {
    return promisify(this.rawWeb3Contract.getDragosByAddress, [
      _owner.toString()
    ]);
  }

  public setOwnerTx(
    _new: BigNumber | string
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "setOwner", [
      _new.toString()
    ]);
  }
  public setBeneficiaryTx(
    _dragoDao: BigNumber | string
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "setBeneficiary", [
      _dragoDao.toString()
    ]);
  }
  public setTargetDragoDaoTx(
    _targetDrago: BigNumber | string,
    _dragoDao: BigNumber | string
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(
      this,
      "setTargetDragoDao",
      [_targetDrago.toString(), _dragoDao.toString()]
    );
  }
  public setFeeTx(
    _fee: BigNumber | number
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "setFee", [
      _fee.toString()
    ]);
  }
  public drainTx(): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "drain", []);
  }
  public setRegistryTx(
    _newRegistry: BigNumber | string
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "setRegistry", [
      _newRegistry.toString()
    ]);
  }
  public changeDragoDaoTx(
    _newDragoDao: BigNumber | string
  ): DeferredTransactionWrapper<ITxParams> {
    return new DeferredTransactionWrapper<ITxParams>(this, "changeDragoDao", [
      _newDragoDao.toString()
    ]);
  }
  public createDragoTx(
    _name: string,
    _symbol: string
  ): DeferredTransactionWrapper<IPayableTxParams> {
    return new DeferredTransactionWrapper<IPayableTxParams>(
      this,
      "createDrago",
      [_name.toString(), _symbol.toString()]
    );
  }
}
