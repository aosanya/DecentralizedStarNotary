# DecentralizedStarNotary
A star notary service that allows users to prove they own an authenticated star!

# Code Coverage
## openzeppelin
This project uses open openzeppelin ERC721 token that has good Code Coverage
Tested functionalities include mint(), approve(), safeTransferFrom(), SetApprovalForAll(), getApproved(), isApprovedForAll(), ownerOf()

## starNotary
The star notary project has Tests in the StarNotaryTest.js test file.
Tested functionalities include createStar(), putStarUpForSale(), buyStar(), starsForSale(), tokenIdToStarInfo()

# Deploy smart contract on a public test network (Rinkeby)
The deployed contract address is : 0x7Bc5a8FE4F29BC156d8a48100F8773df48a8Dc54
Transaction that claims a star : 0x5dc43bf2ce6644e89907c2064ea10e977254331eb5c4796eeece1074188b1fd6

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