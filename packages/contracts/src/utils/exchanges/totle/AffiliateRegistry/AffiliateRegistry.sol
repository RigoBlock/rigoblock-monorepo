pragma solidity 0.4.25;
pragma experimental ABIEncoderV2;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function _transferOwnership(address _newOwner) internal {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that revert on error
 */
library SafeMath {

  /**
  * @dev Multiplies two numbers, reverts on overflow.
  */
  function mul(uint256 _a, uint256 _b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (_a == 0) {
      return 0;
    }

    uint256 c = _a * _b;
    require(c / _a == _b);

    return c;
  }

  /**
  * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
  */
  function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
    require(_b > 0); // Solidity only automatically asserts when dividing by 0
    uint256 c = _a / _b;
    // assert(_a == _b * c + _a % _b); // There is no case in which this doesn't hold

    return c;
  }

  /**
  * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
    require(_b <= _a);
    uint256 c = _a - _b;

    return c;
  }

  /**
  * @dev Adds two numbers, reverts on overflow.
  */
  function add(uint256 _a, uint256 _b) internal pure returns (uint256) {
    uint256 c = _a + _b;
    require(c >= _a);

    return c;
  }

  /**
  * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
  * reverts when dividing by zero.
  */
  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b != 0);
    return a % b;
  }
}

contract Affiliate{

  event FeeLog(uint256 ethCollected);

  address public affiliateBeneficiary;
  uint256 public affiliatePercentage; //This is out of 1 ETH, e.g. 0.5 ETH is 50% of the fee

  uint256 public companyPercentage;
  address public companyBeneficiary;

  function init(address _companyBeneficiary, uint256 _companyPercentage, address _affiliateBeneficiary, uint256 _affiliatePercentage) public {
      require(companyBeneficiary == 0x0 && affiliateBeneficiary == 0x0);
      companyBeneficiary = _companyBeneficiary;
      companyPercentage = _companyPercentage;
      affiliateBeneficiary = _affiliateBeneficiary;
      affiliatePercentage = _affiliatePercentage;
  }

  function payout() public {
      // Payout both the affiliate and the company at the same time
      affiliateBeneficiary.transfer(SafeMath.div(SafeMath.mul(address(this).balance, affiliatePercentage), getTotalFeePercentage()));
      companyBeneficiary.transfer(address(this).balance);
  }

  function() public payable {
      emit FeeLog(msg.value);
  }

  function getTotalFeePercentage() public view returns (uint256){
      return affiliatePercentage + companyPercentage;
  }
}

contract AffiliateRegistry is Ownable {

  address target;
  mapping(address => bool) affiliateContracts;
  address public companyBeneficiary;
  uint256 public companyPercentage;

  event AffiliateRegistered(address affiliateContract);


  constructor(address _target, address _companyBeneficiary, uint256 _companyPercentage) public {
     target = _target;
     companyBeneficiary = _companyBeneficiary;
     companyPercentage = _companyPercentage;
  }

  function registerAffiliate(address affiliateBeneficiary, uint256 affiliatePercentage) external {
      Affiliate newAffiliate = Affiliate(createClone());
      newAffiliate.init(companyBeneficiary, companyPercentage, affiliateBeneficiary, affiliatePercentage);
      affiliateContracts[address(newAffiliate)] = true;
      emit AffiliateRegistered(address(newAffiliate));
  }

  function overrideRegisterAffiliate(address _companyBeneficiary, uint256 _companyPercentage, address affiliateBeneficiary, uint256 affiliatePercentage) external onlyOwner {
      Affiliate newAffiliate = Affiliate(createClone());
      newAffiliate.init(_companyBeneficiary, _companyPercentage, affiliateBeneficiary, affiliatePercentage);
      affiliateContracts[address(newAffiliate)] = true;
      emit AffiliateRegistered(address(newAffiliate));
  }

  function deleteAffiliate(address _affiliateAddress) public onlyOwner {
      affiliateContracts[_affiliateAddress] = false;
  }

  function createClone() internal returns (address result) {
      bytes20 targetBytes = bytes20(target);
      assembly {
          let clone := mload(0x40)
          mstore(clone, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
          mstore(add(clone, 0x14), targetBytes)
          mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
          result := create(0, clone, 0x37)
      }
  }

  function isValidAffiliate(address affiliateContract) public view returns(bool) {
      return affiliateContracts[affiliateContract];
  }

  function updateCompanyInfo(address newCompanyBeneficiary, uint256 newCompanyPercentage) public onlyOwner {
      companyBeneficiary = newCompanyBeneficiary;
      companyPercentage = newCompanyPercentage;
  }
}
