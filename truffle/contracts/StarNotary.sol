pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {

    struct Star {
        string name;
        string starStory;
        string ra;
        string dec;
        string mag;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(bytes32 => bool) public tokenExists;
    mapping(uint256 => uint256) public starsForSale;

    event inform(uint256 _info);
    event informBytes(bytes _info);

    function createStar(string _name,string _starStory,string _ra,string _dec,string _mag, uint256 _tokenId) public {
        bytes32 key = sha256(abi.encodePacked(_ra, _dec, _mag));
        emit inform(_tokenId);
        require(tokenExists[key] == false, "Error : Star already exists!");
        Star memory newStar = Star(_name, _starStory, _ra, _dec, _mag);
        tokenExists[key] = true;
        tokenIdToStarInfo[_tokenId] = newStar;
        _mint(msg.sender, _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(this.ownerOf(_tokenId) == msg.sender, "Error : Sender is not owner of token");

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0, "Error : No stars are up for sale.");

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost, "Error : The offer is less than the star value");

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        //What does the if do? Prevent overpayement? Returns change
        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }
}