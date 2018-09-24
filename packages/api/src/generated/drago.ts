import BaseContract from '../baseContract'
import { BigNumber } from 'bignumber.js'
import { BlockParam, BlockParamLiteral, CallData, ContractAbi, ContractArtifact, DecodedLogArgs, MethodAbi, Provider, TxData, TxDataPayable } from 'ethereum-types';
import * as ethers from 'ethers';
import * as _ from 'lodash';

const DragoAbi = [{"inputs":[{"name":"_dragoName","type":"string"},{"name":"_dragoSymbol","type":"string"},{"name":"_dragoId","type":"uint256"},{"name":"_owner","type":"address"},{"name":"_authority","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"},{"indexed":true,"name":"current","type":"address"}],"name":"NewOwner","type":"event"},{"constant":false,"inputs":[{"name":"_transactionFee","type":"uint256"}],"name":"setTransactionFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"setTransactionFee","functionSignature":"setTransactionFee(uint256)"},{"constant":true,"inputs":[],"name":"getVersion","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"getVersion","functionSignature":"getVersion()"},{"constant":false,"inputs":[{"name":"_enforced","type":"bool"},{"name":"_kycProvider","type":"address"}],"name":"enforceKyc","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"enforceKyc","functionSignature":"enforceKyc(bool,address)"},{"constant":false,"inputs":[{"name":"_new","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"setOwner","functionSignature":"setOwner(address)"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"signature","type":"bytes"}],"name":"isValidSignature","outputs":[{"name":"isValid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"isValidSignature","functionSignature":"isValidSignature(bytes32,bytes)"},{"constant":true,"inputs":[{"name":"assembledData","type":"bytes"}],"name":"findMethod","outputs":[{"name":"method","type":"bytes4"}],"payable":false,"stateMutability":"pure","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"findMethod","functionSignature":"findMethod(bytes)"},{"constant":false,"inputs":[{"name":"_exchange","type":"address"},{"name":"_assembledTransaction","type":"bytes"}],"name":"operateOnExchange","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"operateOnExchange","functionSignature":"operateOnExchange(address,bytes)"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"totalSupply","functionSignature":"totalSupply()"},{"constant":false,"inputs":[],"name":"buyDrago","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"buyDrago","functionSignature":"buyDrago()"},{"constant":false,"inputs":[{"name":"_newSellPrice","type":"uint256"},{"name":"_newBuyPrice","type":"uint256"},{"name":"_signaturevaliduntilBlock","type":"uint256"},{"name":"_hash","type":"bytes32"},{"name":"_signedData","type":"bytes"}],"name":"setPrices","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"setPrices","functionSignature":"setPrices(uint256,uint256,uint256,bytes32,bytes)"},{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"sellPrice","type":"uint256"},{"name":"buyPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":false,"hasReturnValue":true,"tsName":"getData","functionSignature":"getData()"},{"constant":true,"inputs":[{"name":"_exchange","type":"address"}],"name":"getExchangeAdapter","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"getExchangeAdapter","functionSignature":"getExchangeAdapter(address)"},{"constant":false,"inputs":[{"name":"_minPeriod","type":"uint32"}],"name":"changeMinPeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"changeMinPeriod","functionSignature":"changeMinPeriod(uint32)"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"sellDrago","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"sellDrago","functionSignature":"sellDrago(uint256)"},{"constant":false,"inputs":[{"name":"_tokenTransferProxy","type":"address"},{"name":"_tokens","type":"address[]"},{"name":"_amounts","type":"uint256[]"}],"name":"SetMultipleAllowances","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"SetMultipleAllowances","functionSignature":"SetMultipleAllowances(address,address[],uint256[])"},{"constant":false,"inputs":[{"name":"_hodler","type":"address"}],"name":"buyDragoOnBehalf","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"buyDragoOnBehalf","functionSignature":"buyDragoOnBehalf(address)"},{"constant":true,"inputs":[{"name":"_who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"balanceOf","functionSignature":"balanceOf(address)"},{"constant":true,"inputs":[],"name":"getEventful","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"getEventful","functionSignature":"getEventful()"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"owner","functionSignature":"owner()"},{"constant":true,"inputs":[],"name":"getAdminData","outputs":[{"name":"","type":"address"},{"name":"feeCollector","type":"address"},{"name":"dragoDao","type":"address"},{"name":"ratio","type":"uint256"},{"name":"transactionFee","type":"uint256"},{"name":"minPeriod","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":false,"hasReturnValue":true,"tsName":"getAdminData","functionSignature":"getAdminData()"},{"constant":false,"inputs":[{"name":"_feeCollector","type":"address"}],"name":"changeFeeCollector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"changeFeeCollector","functionSignature":"changeFeeCollector(address)"},{"constant":true,"inputs":[],"name":"calcSharePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"calcSharePrice","functionSignature":"calcSharePrice()"},{"constant":true,"inputs":[],"name":"getExchangesAuth","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"getExchangesAuth","functionSignature":"getExchangesAuth()"},{"constant":false,"inputs":[{"name":"_dragoDao","type":"address"}],"name":"changeDragoDao","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"changeDragoDao","functionSignature":"changeDragoDao(address)"},{"constant":false,"inputs":[{"name":"_tokenTransferProxy","type":"address"},{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setAllowance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"setAllowance","functionSignature":"setAllowance(address,address,uint256)"},{"constant":true,"inputs":[],"name":"getKycProvider","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","singleReturnValue":true,"hasReturnValue":true,"tsName":"getKycProvider","functionSignature":"getKycProvider()"},{"constant":false,"inputs":[{"name":"_ratio","type":"uint256"}],"name":"changeRatio","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","singleReturnValue":false,"hasReturnValue":false,"tsName":"changeRatio","functionSignature":"changeRatio(uint256)"}]


export class Drago extends BaseContract {
  private abi
  public constructor(web3: any, address: string) {
    super(web3, address, DragoAbi);
    this.abi = DragoAbi
  }

  static async createAndValidate(
    web3: any,
    address: string
  ): Promise<Drago> {
    const contract = new Drago(web3, address)
    const code = await web3.eth.getCode(address)

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public static address: string
    public getVersion = {
      async callAsync(
      ): Promise<string
      > {
          return this.promisify(this.rawWeb3Contract.getVersion, [])
      }
      
    };
    public isValidSignature = {
      async callAsync(
          hash: string,
          signature: string,
      ): Promise<boolean
      > {
          return this.promisify(this.rawWeb3Contract.isValidSignature, [
      hash.toString(),
      
      signature.toString()
      ])
      }
      
    };
    public findMethod = {
      async callAsync(
          assembledData: string,
      ): Promise<string
      > {
          return this.promisify(this.rawWeb3Contract.findMethod, [
      assembledData.toString()
      ])
      }
      
    };
    public totalSupply = {
      async callAsync(
      ): Promise<BigNumber
      > {
          return this.promisify(this.rawWeb3Contract.totalSupply, [])
      }
      
    };
    public getData = {
      async callAsync(
      ): Promise<[string, string, BigNumber, BigNumber]
      > {
          return this.promisify(this.rawWeb3Contract.getData, [])
      }
      
    };
    public getExchangeAdapter = {
      async callAsync(
          _exchange: string,
      ): Promise<string
      > {
          return this.promisify(this.rawWeb3Contract.getExchangeAdapter, [
      _exchange.toString()
      ])
      }
      
    };
    public balanceOf = {
      async callAsync(
          _who: string,
      ): Promise<BigNumber
      > {
          return this.promisify(this.rawWeb3Contract.balanceOf, [
      _who.toString()
      ])
      }
      
    };
    public getEventful = {
      async callAsync(
      ): Promise<string
      > {
          return this.promisify(this.rawWeb3Contract.getEventful, [])
      }
      
    };
    public owner = {
      async callAsync(
      ): Promise<string
      > {
          return this.promisify(this.rawWeb3Contract.owner, [])
      }
      
    };
    public getAdminData = {
      async callAsync(
      ): Promise<[string, string, string, BigNumber, BigNumber, BigNumber]
      > {
          return this.promisify(this.rawWeb3Contract.getAdminData, [])
      }
      
    };
    public calcSharePrice = {
      async callAsync(
      ): Promise<BigNumber
      > {
          return this.promisify(this.rawWeb3Contract.calcSharePrice, [])
      }
      
    };
    public getExchangesAuth = {
      async callAsync(
      ): Promise<string
      > {
          return this.promisify(this.rawWeb3Contract.getExchangesAuth, [])
      }
      
    };
    public getKycProvider = {
      async callAsync(
      ): Promise<string
      > {
          return this.promisify(this.rawWeb3Contract.getKycProvider, [])
      }
      
    };
  static isDeployed() {
    return !!this.address
  }
}
