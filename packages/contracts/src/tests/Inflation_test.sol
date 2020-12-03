pragma solidity >=0.4.22 <0.8.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../rigoToken/Inflation/Inflation.sol";
import "../rigoToken/ProofOfPerformance/ProofOfPerformance.sol";

contract AuthorityTest {

    mapping (address => bool) whitelistedFactory;
    
    function whitelistFactory() external {
        whitelistedFactory[msg.sender] = true;
        /*
        if (!whitelistedFactory[msg.sender]) {
            whitelistedFactory[msg.sender] = true;
        } else {
            whitelistedFactory[msg.sender] = false;
        }
        */
    }
    
    function isWhitelistedFactory() external view returns (bool) {
        return whitelistedFactory[msg.sender];
    }
}

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract InflationTest {
    address acc0;
    address acc1;
    address acc2;
    
    uint256 immutable inflationFactor = 1;
    address group;
    
    //address rigoTokenAddress;
    address stakingProxyAddress;
    address authorityAddress;
    
    address RIGOTOKENADDRESS = acc0;
    address rigoblockDaoAddress = address(this);
    address dragoRegistryAddress = acc0;
    address STAKINGPROXYADDRESS = acc0;
    
    AuthorityTest authorityTest;
    Inflation inflation;
    ProofOfPerformance proofOfPerformance;
    //RigoToken rigoToken;
    
    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {
        acc0 = TestsAccounts.getAccount(0); 
        acc1 = TestsAccounts.getAccount(1);
        acc2 = TestsAccounts.getAccount(2);
        authorityTest = new AuthorityTest();
        //inflation = new Inflation(acc0, acc0, acc0);
        proofOfPerformance = new ProofOfPerformance(
            RIGOTOKENADDRESS,
            rigoblockDaoAddress,
            dragoRegistryAddress,
            STAKINGPROXYADDRESS
        );
        
        stakingProxyAddress = acc0;
        authorityAddress = acc0;
        group = acc1;
        //rigoToken = new RigoToken(acc0, acc0);
        //rigoToken = new RigoToken(acc0, acc0);
        // Here should instantiate tested contract
        Assert.equal(uint(1), uint(1), "1 should be equal to 1");
    }
    
    function setInflationFactor() public {
        authorityTest.whitelistFactory();
        try inflation.setInflationFactor(group, inflationFactor) {
            //test
        } catch Error(string memory reason) {
            
        }    
        
        //Assert.equal(success, true, 'execution should be successful');
        //uint256 outputInflationFactor = inflation.getInflationFactor(group);
        //Assert.equal(outputInflationFactor, 1, "inflationFactor should be equal to 1");
    }
    
    // function does not set inflation factor if factory not whitelisted
    // function does not set inflation factor if caller not dao

    function checkSuccess() public {
        // Use 'Assert' to test the contract, 
        // See documentation: https://remix-ide.readthedocs.io/en/latest/assert_library.html
        Assert.equal(uint(2), uint(2), "2 should be equal to 2");
        Assert.notEqual(uint(2), uint(3), "2 should not be equal to 3");
    }

    function checkSuccess2() public pure returns (bool) {
        // Use the return value (true or false) to test the contract
        return true;
    }
    
    /*
    function checkFailure() public {
        Assert.equal(uint(1), uint(2), "1 is not equal to 2");
    }
    */

    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-1
    /// #value: 100
    function checkSenderAndValue() public payable {
        // account index varies 0-9, value is in wei
        Assert.equal(msg.sender, TestsAccounts.getAccount(1), "Invalid sender");
        Assert.equal(msg.value, 100, "Invalid value");
    }
}