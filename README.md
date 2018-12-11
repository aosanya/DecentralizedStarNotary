# DecentralizedStarNotary
A star notary service that allows users to prove they own an authenticated star!

# Code Coverage
## openzeppelin
This project uses open openzeppelin ERC721 token that has good Code Coverage
Tested functionalities include mint(), approve(), safeTransferFrom(), SetApprovalForAll(), getApproved(), isApprovedForAll(), ownerOf()

## starNotary
The star notary project has Tests in the StarNotaryTest.js test file.
Tested functionalities include createStar(), putStarUpForSale(), buyStar(), starsForSale(), tokenIdToStarInfo()

# Deployed smart contract on public test network (Rinkeby)
The deployed contract address is : 0x2C226af7F1dfA445381f02102025b3aB2bcd0418
Transaction that claims a star : 0x3fe97cdf01d6337d5e01d0e9cf0e18b699471e7d8fde1792ea2d491b10f855aa
Transaction that buys a star : 0x9f32cb9572a0761d6e873e01270d94d06ff1dc9b6c9132c2395fca3502f8c61f

# Testing on the Rinkeby Network
Navigate to the /Truffle folder
Start the http-server by
`
    http-server
`
##Create a star
In the browser, navigate to the ip adress of the http-server e.g
`
    http://127.0.0.1:8080
`
The index page provides a form that can be used to claim a star.
Fill in the form and click the 'Claim Star' button

##Look up a star
In the browser, navigate to the ip adress of the http-server e.g
`
    http://127.0.0.1:8080/lookup.html
`
This page provides a textarea to enter the Star Id you want to look up
Once you have entered the star id, click the 'Lookup Star' button to load the star detail

##Put a star up for sale
In the browser, navigate to the page adress of the http-server e.g
`
    http://127.0.0.1:8080/putupstarforsale.html
`
This page provides a textareas to enter your address, the Star Id you want to put up for sale and the asking price.
Once you have entered the information, click the 'Put up for sale'.
Using the lookup page, you should be able to see the asking price.

##Buy a star
In the browser, navigate to the page adress of the http-server e.g
`
    http://127.0.0.1:8080/buyStar.html
`
This page provides a textareas to enter your address, the Star Id you want to put up for sale and the price in ether you are willing to pay.
Once you have entered the information, click the 'Buy Star'.
Using ether scan, you should be able to be able to track the transaction.