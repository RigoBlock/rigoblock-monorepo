/* GENERATED BY TYPECHAIN VER. 0.2.7 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class Drago extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: false,
        inputs: [{ name: "_transactionFee", type: "uint256" }],
        name: "setTransactionFee",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getVersion",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "pure",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_enforced", type: "bool" },
          { name: "_kycProvider", type: "address" }
        ],
        name: "enforceKyc",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
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
        constant: true,
        inputs: [
          { name: "hash", type: "bytes32" },
          { name: "signature", type: "bytes" }
        ],
        name: "isValidSignature",
        outputs: [{ name: "isValid", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "assembledData", type: "bytes" }],
        name: "findMethod",
        outputs: [{ name: "method", type: "bytes4" }],
        payable: false,
        stateMutability: "pure",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_exchange", type: "address" },
          { name: "_assembledTransaction", type: "bytes" }
        ],
        name: "operateOnExchange",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [],
        name: "buyDrago",
        outputs: [{ name: "success", type: "bool" }],
        payable: true,
        stateMutability: "payable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_newSellPrice", type: "uint256" },
          { name: "_newBuyPrice", type: "uint256" },
          { name: "_signaturevaliduntilBlock", type: "uint256" },
          { name: "_hash", type: "bytes32" },
          { name: "_signedData", type: "bytes" }
        ],
        name: "setPrices",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getData",
        outputs: [
          { name: "name", type: "string" },
          { name: "symbol", type: "string" },
          { name: "sellPrice", type: "uint256" },
          { name: "buyPrice", type: "uint256" }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_exchange", type: "address" }],
        name: "getExchangeAdapter",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_minPeriod", type: "uint32" }],
        name: "changeMinPeriod",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_amount", type: "uint256" }],
        name: "sellDrago",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_tokenTransferProxy", type: "address" },
          { name: "_tokens", type: "address[]" },
          { name: "_amounts", type: "uint256[]" }
        ],
        name: "SetMultipleAllowances",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_hodler", type: "address" }],
        name: "buyDragoOnBehalf",
        outputs: [{ name: "success", type: "bool" }],
        payable: true,
        stateMutability: "payable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_who", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
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
        constant: true,
        inputs: [],
        name: "getAdminData",
        outputs: [
          { name: "", type: "address" },
          { name: "feeCollector", type: "address" },
          { name: "dragoDao", type: "address" },
          { name: "ratio", type: "uint256" },
          { name: "transactionFee", type: "uint256" },
          { name: "minPeriod", type: "uint32" }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_feeCollector", type: "address" }],
        name: "changeFeeCollector",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "calcSharePrice",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getExchangesAuth",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_dragoDao", type: "address" }],
        name: "changeDragoDao",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_tokenTransferProxy", type: "address" },
          { name: "_token", type: "address" },
          { name: "_amount", type: "uint256" }
        ],
        name: "setAllowance",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getKycProvider",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_ratio", type: "uint256" }],
        name: "changeRatio",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          { name: "_dragoName", type: "string" },
          { name: "_dragoSymbol", type: "string" },
          { name: "_dragoId", type: "uint256" },
          { name: "_owner", type: "address" },
          { name: "_authority", type: "address" }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      { payable: true, stateMutability: "payable", type: "fallback" },
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
  ): Promise<Drago> {
    const contract = new Drago(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get getVersion(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getVersion, []);
  }

  public get totalSupply(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.totalSupply, []);
  }

  public get getEventful(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getEventful, []);
  }

  public get owner(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.owner, []);
  }

  public get calcSharePrice(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.calcSharePrice, []);
  }

  public get getExchangesAuth(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getExchangesAuth, []);
  }

  public get getKycProvider(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getKycProvider, []);
  }

  public isValidSignature(hash: string, signature: string[]): Promise<boolean> {
    return TC.promisify(this.rawWeb3Contract.isValidSignature, [
      hash.toString(),
      signature.map(val => val.toString())
    ]);
  }

  public findMethod(assembledData: string[]): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.findMethod, [
      assembledData.map(val => val.toString())
    ]);
  }

  public getData(): Promise<[string, string, BigNumber, BigNumber]> {
    return TC.promisify(this.rawWeb3Contract.getData, []);
  }

  public getExchangeAdapter(_exchange: BigNumber | string): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getExchangeAdapter, [
      _exchange.toString()
    ]);
  }

  public balanceOf(_who: BigNumber | string): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.balanceOf, [_who.toString()]);
  }

  public getAdminData(): Promise<
    [string, string, string, BigNumber, BigNumber, BigNumber]
  > {
    return TC.promisify(this.rawWeb3Contract.getAdminData, []);
  }

  public setTransactionFeeTx(
    _transactionFee: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "setTransactionFee",
      [_transactionFee.toString()]
    );
  }
  public enforceKycTx(
    _enforced: boolean,
    _kycProvider: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "enforceKyc", [
      _enforced.toString(),
      _kycProvider.toString()
    ]);
  }
  public setOwnerTx(
    _new: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "setOwner", [
      _new.toString()
    ]);
  }
  public operateOnExchangeTx(
    _exchange: BigNumber | string,
    _assembledTransaction: string[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "operateOnExchange",
      [_exchange.toString(), _assembledTransaction.map(val => val.toString())]
    );
  }
  public buyDragoTx(): TC.DeferredTransactionWrapper<TC.IPayableTxParams> {
    return new TC.DeferredTransactionWrapper<TC.IPayableTxParams>(
      this,
      "buyDrago",
      []
    );
  }
  public setPricesTx(
    _newSellPrice: BigNumber | number,
    _newBuyPrice: BigNumber | number,
    _signaturevaliduntilBlock: BigNumber | number,
    _hash: string,
    _signedData: string[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "setPrices", [
      _newSellPrice.toString(),
      _newBuyPrice.toString(),
      _signaturevaliduntilBlock.toString(),
      _hash.toString(),
      _signedData.map(val => val.toString())
    ]);
  }
  public changeMinPeriodTx(
    _minPeriod: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "changeMinPeriod",
      [_minPeriod.toString()]
    );
  }
  public sellDragoTx(
    _amount: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "sellDrago", [
      _amount.toString()
    ]);
  }
  public SetMultipleAllowancesTx(
    _tokenTransferProxy: BigNumber | string,
    _tokens: string[],
    _amounts: BigNumber[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "SetMultipleAllowances",
      [
        _tokenTransferProxy.toString(),
        _tokens.map(val => val.toString()),
        _amounts.map(val => val.toString())
      ]
    );
  }
  public buyDragoOnBehalfTx(
    _hodler: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.IPayableTxParams> {
    return new TC.DeferredTransactionWrapper<TC.IPayableTxParams>(
      this,
      "buyDragoOnBehalf",
      [_hodler.toString()]
    );
  }
  public changeFeeCollectorTx(
    _feeCollector: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "changeFeeCollector",
      [_feeCollector.toString()]
    );
  }
  public changeDragoDaoTx(
    _dragoDao: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "changeDragoDao",
      [_dragoDao.toString()]
    );
  }
  public setAllowanceTx(
    _tokenTransferProxy: BigNumber | string,
    _token: BigNumber | string,
    _amount: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "setAllowance",
      [_tokenTransferProxy.toString(), _token.toString(), _amount.toString()]
    );
  }
  public changeRatioTx(
    _ratio: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "changeRatio",
      [_ratio.toString()]
    );
  }

  public NewOwnerEvent(eventFilter: {
    old?: BigNumber | string | Array<BigNumber | string>;
    current?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    { old: BigNumber | string; current: BigNumber | string },
    {
      old?: BigNumber | string | Array<BigNumber | string>;
      current?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      { old: BigNumber | string; current: BigNumber | string },
      {
        old?: BigNumber | string | Array<BigNumber | string>;
        current?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "NewOwner", eventFilter);
  }
}
