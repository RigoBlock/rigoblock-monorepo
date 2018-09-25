/* GENERATED BY TYPECHAIN VER. 0.2.7 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class ExchangeEfx extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: true,
        inputs: [
          { name: "numerator", type: "uint256" },
          { name: "denominator", type: "uint256" },
          { name: "target", type: "uint256" }
        ],
        name: "isRoundingError",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "pure",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "bytes32" }],
        name: "filled",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "bytes32" }],
        name: "cancelled",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "orderAddresses", type: "address[5][]" },
          { name: "orderValues", type: "uint256[6][]" },
          { name: "fillTakerTokenAmount", type: "uint256" },
          { name: "shouldThrowOnInsufficientBalanceOrAllowance", type: "bool" },
          { name: "v", type: "uint8[]" },
          { name: "r", type: "bytes32[]" },
          { name: "s", type: "bytes32[]" }
        ],
        name: "fillOrdersUpTo",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "ETHFINEX_FEE",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "orderAddresses", type: "address[5][]" },
          { name: "orderValues", type: "uint256[6][]" },
          { name: "fillTakerTokenAmounts", type: "uint256[]" },
          { name: "v", type: "uint8[]" },
          { name: "r", type: "bytes32[]" },
          { name: "s", type: "bytes32[]" }
        ],
        name: "batchFillOrKillOrders",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "orderAddresses", type: "address[5]" },
          { name: "orderValues", type: "uint256[6]" },
          { name: "fillTakerTokenAmount", type: "uint256" },
          { name: "v", type: "uint8" },
          { name: "r", type: "bytes32" },
          { name: "s", type: "bytes32" }
        ],
        name: "fillOrKillOrder",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "validatorAddress", type: "address" },
          { name: "approval", type: "bool" }
        ],
        name: "setSignatureValidatorApproval",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }, { name: "", type: "address" }],
        name: "allowedValidators",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "orderHash", type: "bytes32" }],
        name: "getUnavailableTakerTokenAmount",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          { name: "maker", type: "address" },
          { name: "hash", type: "bytes32" },
          { name: "v", type: "uint8" },
          { name: "r", type: "bytes32" },
          { name: "s", type: "bytes32" }
        ],
        name: "isValidSignature",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          { name: "numerator", type: "uint256" },
          { name: "denominator", type: "uint256" },
          { name: "target", type: "uint256" }
        ],
        name: "getPartialAmount",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "pure",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "TOKEN_TRANSFER_PROXY_CONTRACT",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "orderAddresses", type: "address[5][]" },
          { name: "orderValues", type: "uint256[6][]" },
          { name: "fillTakerTokenAmounts", type: "uint256[]" },
          { name: "shouldThrowOnInsufficientBalanceOrAllowance", type: "bool" },
          { name: "v", type: "uint8[]" },
          { name: "r", type: "bytes32[]" },
          { name: "s", type: "bytes32[]" }
        ],
        name: "batchFillOrders",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "orderAddresses", type: "address[5]" },
          { name: "orderValues", type: "uint256[6]" },
          { name: "fillTakerTokenAmount", type: "uint256" },
          { name: "shouldThrowOnInsufficientBalanceOrAllowance", type: "bool" },
          { name: "v", type: "uint8" },
          { name: "r", type: "bytes32" },
          { name: "s", type: "bytes32" }
        ],
        name: "fillOrder",
        outputs: [{ name: "filledTakerTokenAmount", type: "uint256" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          { name: "orderAddresses", type: "address[5]" },
          { name: "orderValues", type: "uint256[6]" }
        ],
        name: "getOrderHash",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "EXTERNAL_QUERY_GAS_LIMIT",
        outputs: [{ name: "", type: "uint16" }],
        payable: false,
        stateMutability: "view",
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
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "maker", type: "address" },
          { indexed: false, name: "taker", type: "address" },
          { indexed: true, name: "feeRecipient", type: "address" },
          { indexed: false, name: "makerToken", type: "address" },
          { indexed: false, name: "takerToken", type: "address" },
          { indexed: false, name: "filledMakerTokenAmount", type: "uint256" },
          { indexed: false, name: "filledTakerTokenAmount", type: "uint256" },
          { indexed: false, name: "paidMakerFee", type: "uint256" },
          { indexed: false, name: "paidTakerFee", type: "uint256" },
          { indexed: true, name: "tokens", type: "bytes32" },
          { indexed: false, name: "orderHash", type: "bytes32" }
        ],
        name: "LogFill",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "maker", type: "address" },
          { indexed: true, name: "feeRecipient", type: "address" },
          { indexed: false, name: "makerToken", type: "address" },
          { indexed: false, name: "takerToken", type: "address" },
          {
            indexed: false,
            name: "cancelledMakerTokenAmount",
            type: "uint256"
          },
          {
            indexed: false,
            name: "cancelledTakerTokenAmount",
            type: "uint256"
          },
          { indexed: true, name: "tokens", type: "bytes32" },
          { indexed: false, name: "orderHash", type: "bytes32" }
        ],
        name: "LogCancel",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "errorId", type: "uint8" },
          { indexed: true, name: "orderHash", type: "bytes32" }
        ],
        name: "LogError",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "signerAddress", type: "address" },
          { indexed: true, name: "validatorAddress", type: "address" },
          { indexed: false, name: "approved", type: "bool" }
        ],
        name: "SignatureValidatorApproval",
        type: "event"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<ExchangeEfx> {
    const contract = new ExchangeEfx(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get ETHFINEX_FEE(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.ETHFINEX_FEE, []);
  }

  public get TOKEN_TRANSFER_PROXY_CONTRACT(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.TOKEN_TRANSFER_PROXY_CONTRACT, []);
  }

  public get EXTERNAL_QUERY_GAS_LIMIT(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.EXTERNAL_QUERY_GAS_LIMIT, []);
  }

  public get VERSION(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.VERSION, []);
  }

  public isRoundingError(
    numerator: BigNumber | number,
    denominator: BigNumber | number,
    target: BigNumber | number
  ): Promise<boolean> {
    return TC.promisify(this.rawWeb3Contract.isRoundingError, [
      numerator.toString(),
      denominator.toString(),
      target.toString()
    ]);
  }

  public filled(arg0: string): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.filled, [arg0.toString()]);
  }

  public cancelled(arg0: string): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.cancelled, [arg0.toString()]);
  }

  public allowedValidators(
    arg0: BigNumber | string,
    arg1: BigNumber | string
  ): Promise<boolean> {
    return TC.promisify(this.rawWeb3Contract.allowedValidators, [
      arg0.toString(),
      arg1.toString()
    ]);
  }

  public getUnavailableTakerTokenAmount(orderHash: string): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.getUnavailableTakerTokenAmount, [
      orderHash.toString()
    ]);
  }

  public isValidSignature(
    maker: BigNumber | string,
    hash: string,
    v: BigNumber | number,
    r: string,
    s: string
  ): Promise<boolean> {
    return TC.promisify(this.rawWeb3Contract.isValidSignature, [
      maker.toString(),
      hash.toString(),
      v.toString(),
      r.toString(),
      s.toString()
    ]);
  }

  public getPartialAmount(
    numerator: BigNumber | number,
    denominator: BigNumber | number,
    target: BigNumber | number
  ): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.getPartialAmount, [
      numerator.toString(),
      denominator.toString(),
      target.toString()
    ]);
  }

  public getOrderHash(
    orderAddresses: string[],
    orderValues: BigNumber[]
  ): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getOrderHash, [
      orderAddresses.map(val => val.toString()),
      orderValues.map(val => val.toString())
    ]);
  }

  public fillOrdersUpToTx(
    orderAddresses: string[][],
    orderValues: BigNumber[][],
    fillTakerTokenAmount: BigNumber | number,
    shouldThrowOnInsufficientBalanceOrAllowance: boolean,
    v: BigNumber[],
    r: string[],
    s: string[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "fillOrdersUpTo",
      [
        orderAddresses.map(val => val.toString()),
        orderValues.map(val => val.toString()),
        fillTakerTokenAmount.toString(),
        shouldThrowOnInsufficientBalanceOrAllowance.toString(),
        v.map(val => val.toString()),
        r.map(val => val.toString()),
        s.map(val => val.toString())
      ]
    );
  }
  public batchFillOrKillOrdersTx(
    orderAddresses: string[][],
    orderValues: BigNumber[][],
    fillTakerTokenAmounts: BigNumber[],
    v: BigNumber[],
    r: string[],
    s: string[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "batchFillOrKillOrders",
      [
        orderAddresses.map(val => val.toString()),
        orderValues.map(val => val.toString()),
        fillTakerTokenAmounts.map(val => val.toString()),
        v.map(val => val.toString()),
        r.map(val => val.toString()),
        s.map(val => val.toString())
      ]
    );
  }
  public fillOrKillOrderTx(
    orderAddresses: string[],
    orderValues: BigNumber[],
    fillTakerTokenAmount: BigNumber | number,
    v: BigNumber | number,
    r: string,
    s: string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "fillOrKillOrder",
      [
        orderAddresses.map(val => val.toString()),
        orderValues.map(val => val.toString()),
        fillTakerTokenAmount.toString(),
        v.toString(),
        r.toString(),
        s.toString()
      ]
    );
  }
  public setSignatureValidatorApprovalTx(
    validatorAddress: BigNumber | string,
    approval: boolean
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "setSignatureValidatorApproval",
      [validatorAddress.toString(), approval.toString()]
    );
  }
  public batchFillOrdersTx(
    orderAddresses: string[][],
    orderValues: BigNumber[][],
    fillTakerTokenAmounts: BigNumber[],
    shouldThrowOnInsufficientBalanceOrAllowance: boolean,
    v: BigNumber[],
    r: string[],
    s: string[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "batchFillOrders",
      [
        orderAddresses.map(val => val.toString()),
        orderValues.map(val => val.toString()),
        fillTakerTokenAmounts.map(val => val.toString()),
        shouldThrowOnInsufficientBalanceOrAllowance.toString(),
        v.map(val => val.toString()),
        r.map(val => val.toString()),
        s.map(val => val.toString())
      ]
    );
  }
  public fillOrderTx(
    orderAddresses: string[],
    orderValues: BigNumber[],
    fillTakerTokenAmount: BigNumber | number,
    shouldThrowOnInsufficientBalanceOrAllowance: boolean,
    v: BigNumber | number,
    r: string,
    s: string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "fillOrder", [
      orderAddresses.map(val => val.toString()),
      orderValues.map(val => val.toString()),
      fillTakerTokenAmount.toString(),
      shouldThrowOnInsufficientBalanceOrAllowance.toString(),
      v.toString(),
      r.toString(),
      s.toString()
    ]);
  }

  public LogFillEvent(eventFilter: {
    maker?: BigNumber | string | Array<BigNumber | string>;
    feeRecipient?: BigNumber | string | Array<BigNumber | string>;
    tokens?: string | Array<string>;
  }): TC.DeferredEventWrapper<
    {
      maker: BigNumber | string;
      taker: BigNumber | string;
      feeRecipient: BigNumber | string;
      makerToken: BigNumber | string;
      takerToken: BigNumber | string;
      filledMakerTokenAmount: BigNumber | number;
      filledTakerTokenAmount: BigNumber | number;
      paidMakerFee: BigNumber | number;
      paidTakerFee: BigNumber | number;
      tokens: string;
      orderHash: string;
    },
    {
      maker?: BigNumber | string | Array<BigNumber | string>;
      feeRecipient?: BigNumber | string | Array<BigNumber | string>;
      tokens?: string | Array<string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        maker: BigNumber | string;
        taker: BigNumber | string;
        feeRecipient: BigNumber | string;
        makerToken: BigNumber | string;
        takerToken: BigNumber | string;
        filledMakerTokenAmount: BigNumber | number;
        filledTakerTokenAmount: BigNumber | number;
        paidMakerFee: BigNumber | number;
        paidTakerFee: BigNumber | number;
        tokens: string;
        orderHash: string;
      },
      {
        maker?: BigNumber | string | Array<BigNumber | string>;
        feeRecipient?: BigNumber | string | Array<BigNumber | string>;
        tokens?: string | Array<string>;
      }
    >(this, "LogFill", eventFilter);
  }
  public LogCancelEvent(eventFilter: {
    maker?: BigNumber | string | Array<BigNumber | string>;
    feeRecipient?: BigNumber | string | Array<BigNumber | string>;
    tokens?: string | Array<string>;
  }): TC.DeferredEventWrapper<
    {
      maker: BigNumber | string;
      feeRecipient: BigNumber | string;
      makerToken: BigNumber | string;
      takerToken: BigNumber | string;
      cancelledMakerTokenAmount: BigNumber | number;
      cancelledTakerTokenAmount: BigNumber | number;
      tokens: string;
      orderHash: string;
    },
    {
      maker?: BigNumber | string | Array<BigNumber | string>;
      feeRecipient?: BigNumber | string | Array<BigNumber | string>;
      tokens?: string | Array<string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        maker: BigNumber | string;
        feeRecipient: BigNumber | string;
        makerToken: BigNumber | string;
        takerToken: BigNumber | string;
        cancelledMakerTokenAmount: BigNumber | number;
        cancelledTakerTokenAmount: BigNumber | number;
        tokens: string;
        orderHash: string;
      },
      {
        maker?: BigNumber | string | Array<BigNumber | string>;
        feeRecipient?: BigNumber | string | Array<BigNumber | string>;
        tokens?: string | Array<string>;
      }
    >(this, "LogCancel", eventFilter);
  }
  public LogErrorEvent(eventFilter: {
    errorId?: BigNumber | number | Array<BigNumber | number>;
    orderHash?: string | Array<string>;
  }): TC.DeferredEventWrapper<
    { errorId: BigNumber | number; orderHash: string },
    {
      errorId?: BigNumber | number | Array<BigNumber | number>;
      orderHash?: string | Array<string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      { errorId: BigNumber | number; orderHash: string },
      {
        errorId?: BigNumber | number | Array<BigNumber | number>;
        orderHash?: string | Array<string>;
      }
    >(this, "LogError", eventFilter);
  }
  public SignatureValidatorApprovalEvent(eventFilter: {
    signerAddress?: BigNumber | string | Array<BigNumber | string>;
    validatorAddress?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      signerAddress: BigNumber | string;
      validatorAddress: BigNumber | string;
      approved: boolean;
    },
    {
      signerAddress?: BigNumber | string | Array<BigNumber | string>;
      validatorAddress?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        signerAddress: BigNumber | string;
        validatorAddress: BigNumber | string;
        approved: boolean;
      },
      {
        signerAddress?: BigNumber | string | Array<BigNumber | string>;
        validatorAddress?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "SignatureValidatorApproval", eventFilter);
  }
}
