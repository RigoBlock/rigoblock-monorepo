/* GENERATED BY TYPECHAIN VER. 0.2.7 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class VaultEventful extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: false,
        inputs: [
          { name: "_who", type: "address" },
          { name: "_newVault", type: "address" },
          { name: "_name", type: "string" },
          { name: "_symbol", type: "string" },
          { name: "_vaultId", type: "uint256" }
        ],
        name: "createVault",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_who", type: "address" },
          { name: "_targetVault", type: "address" },
          { name: "_value", type: "uint256" },
          { name: "_amount", type: "uint256" },
          { name: "_name", type: "bytes" },
          { name: "_symbol", type: "bytes" }
        ],
        name: "buyVault",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "AUTHORITY",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_who", type: "address" },
          { name: "_targetVault", type: "address" },
          { name: "_vaultDao", type: "address" }
        ],
        name: "changeVaultDao",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_who", type: "address" },
          { name: "_targetVault", type: "address" },
          { name: "_ratio", type: "uint256" }
        ],
        name: "changeRatio",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_who", type: "address" },
          { name: "_targetVault", type: "address" },
          { name: "_transactionFee", type: "uint256" }
        ],
        name: "setTransactionFee",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_who", type: "address" },
          { name: "_targetVault", type: "address" },
          { name: "_feeCollector", type: "address" }
        ],
        name: "changeFeeCollector",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_who", type: "address" },
          { name: "_targetVault", type: "address" },
          { name: "_amount", type: "uint256" },
          { name: "_revenue", type: "uint256" },
          { name: "_name", type: "bytes" },
          { name: "_symbol", type: "bytes" }
        ],
        name: "sellVault",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
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
        inputs: [{ name: "_authority", type: "address" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "vault", type: "address" },
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "amount", type: "uint256" },
          { indexed: false, name: "revenue", type: "uint256" },
          { indexed: false, name: "name", type: "bytes" },
          { indexed: false, name: "symbol", type: "bytes" }
        ],
        name: "BuyVault",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "vault", type: "address" },
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "amount", type: "uint256" },
          { indexed: false, name: "revenue", type: "uint256" },
          { indexed: false, name: "name", type: "bytes" },
          { indexed: false, name: "symbol", type: "bytes" }
        ],
        name: "SellVault",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "vault", type: "address" },
          { indexed: true, name: "from", type: "address" },
          { indexed: false, name: "newRatio", type: "uint256" }
        ],
        name: "NewRatio",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "vault", type: "address" },
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "fee", type: "uint256" }
        ],
        name: "NewFee",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "vault", type: "address" },
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "collector", type: "address" }
        ],
        name: "NewCollector",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "vault", type: "address" },
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "vaultDao", type: "address" }
        ],
        name: "VaultDao",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "vault", type: "address" },
          { indexed: true, name: "group", type: "address" },
          { indexed: true, name: "owner", type: "address" },
          { indexed: false, name: "vaultId", type: "uint256" },
          { indexed: false, name: "name", type: "string" },
          { indexed: false, name: "symbol", type: "string" }
        ],
        name: "VaultCreated",
        type: "event"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<VaultEventful> {
    const contract = new VaultEventful(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get AUTHORITY(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.AUTHORITY, []);
  }

  public get VERSION(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.VERSION, []);
  }

  public createVaultTx(
    _who: BigNumber | string,
    _newVault: BigNumber | string,
    _name: string,
    _symbol: string,
    _vaultId: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "createVault",
      [
        _who.toString(),
        _newVault.toString(),
        _name.toString(),
        _symbol.toString(),
        _vaultId.toString()
      ]
    );
  }
  public buyVaultTx(
    _who: BigNumber | string,
    _targetVault: BigNumber | string,
    _value: BigNumber | number,
    _amount: BigNumber | number,
    _name: string[],
    _symbol: string[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "buyVault", [
      _who.toString(),
      _targetVault.toString(),
      _value.toString(),
      _amount.toString(),
      _name.map(val => val.toString()),
      _symbol.map(val => val.toString())
    ]);
  }
  public changeVaultDaoTx(
    _who: BigNumber | string,
    _targetVault: BigNumber | string,
    _vaultDao: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "changeVaultDao",
      [_who.toString(), _targetVault.toString(), _vaultDao.toString()]
    );
  }
  public changeRatioTx(
    _who: BigNumber | string,
    _targetVault: BigNumber | string,
    _ratio: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "changeRatio",
      [_who.toString(), _targetVault.toString(), _ratio.toString()]
    );
  }
  public setTransactionFeeTx(
    _who: BigNumber | string,
    _targetVault: BigNumber | string,
    _transactionFee: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "setTransactionFee",
      [_who.toString(), _targetVault.toString(), _transactionFee.toString()]
    );
  }
  public changeFeeCollectorTx(
    _who: BigNumber | string,
    _targetVault: BigNumber | string,
    _feeCollector: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "changeFeeCollector",
      [_who.toString(), _targetVault.toString(), _feeCollector.toString()]
    );
  }
  public sellVaultTx(
    _who: BigNumber | string,
    _targetVault: BigNumber | string,
    _amount: BigNumber | number,
    _revenue: BigNumber | number,
    _name: string[],
    _symbol: string[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "sellVault", [
      _who.toString(),
      _targetVault.toString(),
      _amount.toString(),
      _revenue.toString(),
      _name.map(val => val.toString()),
      _symbol.map(val => val.toString())
    ]);
  }

  public BuyVaultEvent(eventFilter: {
    vault?: BigNumber | string | Array<BigNumber | string>;
    from?: BigNumber | string | Array<BigNumber | string>;
    to?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      vault: BigNumber | string;
      from: BigNumber | string;
      to: BigNumber | string;
      amount: BigNumber | number;
      revenue: BigNumber | number;
      name: string[];
      symbol: string[];
    },
    {
      vault?: BigNumber | string | Array<BigNumber | string>;
      from?: BigNumber | string | Array<BigNumber | string>;
      to?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        vault: BigNumber | string;
        from: BigNumber | string;
        to: BigNumber | string;
        amount: BigNumber | number;
        revenue: BigNumber | number;
        name: string[];
        symbol: string[];
      },
      {
        vault?: BigNumber | string | Array<BigNumber | string>;
        from?: BigNumber | string | Array<BigNumber | string>;
        to?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "BuyVault", eventFilter);
  }
  public SellVaultEvent(eventFilter: {
    vault?: BigNumber | string | Array<BigNumber | string>;
    from?: BigNumber | string | Array<BigNumber | string>;
    to?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      vault: BigNumber | string;
      from: BigNumber | string;
      to: BigNumber | string;
      amount: BigNumber | number;
      revenue: BigNumber | number;
      name: string[];
      symbol: string[];
    },
    {
      vault?: BigNumber | string | Array<BigNumber | string>;
      from?: BigNumber | string | Array<BigNumber | string>;
      to?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        vault: BigNumber | string;
        from: BigNumber | string;
        to: BigNumber | string;
        amount: BigNumber | number;
        revenue: BigNumber | number;
        name: string[];
        symbol: string[];
      },
      {
        vault?: BigNumber | string | Array<BigNumber | string>;
        from?: BigNumber | string | Array<BigNumber | string>;
        to?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "SellVault", eventFilter);
  }
  public NewRatioEvent(eventFilter: {
    vault?: BigNumber | string | Array<BigNumber | string>;
    from?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      vault: BigNumber | string;
      from: BigNumber | string;
      newRatio: BigNumber | number;
    },
    {
      vault?: BigNumber | string | Array<BigNumber | string>;
      from?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        vault: BigNumber | string;
        from: BigNumber | string;
        newRatio: BigNumber | number;
      },
      {
        vault?: BigNumber | string | Array<BigNumber | string>;
        from?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "NewRatio", eventFilter);
  }
  public NewFeeEvent(eventFilter: {
    vault?: BigNumber | string | Array<BigNumber | string>;
    from?: BigNumber | string | Array<BigNumber | string>;
    to?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      vault: BigNumber | string;
      from: BigNumber | string;
      to: BigNumber | string;
      fee: BigNumber | number;
    },
    {
      vault?: BigNumber | string | Array<BigNumber | string>;
      from?: BigNumber | string | Array<BigNumber | string>;
      to?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        vault: BigNumber | string;
        from: BigNumber | string;
        to: BigNumber | string;
        fee: BigNumber | number;
      },
      {
        vault?: BigNumber | string | Array<BigNumber | string>;
        from?: BigNumber | string | Array<BigNumber | string>;
        to?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "NewFee", eventFilter);
  }
  public NewCollectorEvent(eventFilter: {
    vault?: BigNumber | string | Array<BigNumber | string>;
    from?: BigNumber | string | Array<BigNumber | string>;
    to?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      vault: BigNumber | string;
      from: BigNumber | string;
      to: BigNumber | string;
      collector: BigNumber | string;
    },
    {
      vault?: BigNumber | string | Array<BigNumber | string>;
      from?: BigNumber | string | Array<BigNumber | string>;
      to?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        vault: BigNumber | string;
        from: BigNumber | string;
        to: BigNumber | string;
        collector: BigNumber | string;
      },
      {
        vault?: BigNumber | string | Array<BigNumber | string>;
        from?: BigNumber | string | Array<BigNumber | string>;
        to?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "NewCollector", eventFilter);
  }
  public VaultDaoEvent(eventFilter: {
    vault?: BigNumber | string | Array<BigNumber | string>;
    from?: BigNumber | string | Array<BigNumber | string>;
    to?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      vault: BigNumber | string;
      from: BigNumber | string;
      to: BigNumber | string;
      vaultDao: BigNumber | string;
    },
    {
      vault?: BigNumber | string | Array<BigNumber | string>;
      from?: BigNumber | string | Array<BigNumber | string>;
      to?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        vault: BigNumber | string;
        from: BigNumber | string;
        to: BigNumber | string;
        vaultDao: BigNumber | string;
      },
      {
        vault?: BigNumber | string | Array<BigNumber | string>;
        from?: BigNumber | string | Array<BigNumber | string>;
        to?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "VaultDao", eventFilter);
  }
  public VaultCreatedEvent(eventFilter: {
    vault?: BigNumber | string | Array<BigNumber | string>;
    group?: BigNumber | string | Array<BigNumber | string>;
    owner?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      vault: BigNumber | string;
      group: BigNumber | string;
      owner: BigNumber | string;
      vaultId: BigNumber | number;
      name: string;
      symbol: string;
    },
    {
      vault?: BigNumber | string | Array<BigNumber | string>;
      group?: BigNumber | string | Array<BigNumber | string>;
      owner?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        vault: BigNumber | string;
        group: BigNumber | string;
        owner: BigNumber | string;
        vaultId: BigNumber | number;
        name: string;
        symbol: string;
      },
      {
        vault?: BigNumber | string | Array<BigNumber | string>;
        group?: BigNumber | string | Array<BigNumber | string>;
        owner?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "VaultCreated", eventFilter);
  }
}
