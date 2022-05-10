const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

const verifierRegex = /contract Verifier/
const plonkVerifierRegex = /contract PlonkVerifier/

let content1 = fs.readFileSync("./contracts/HelloWorldVerifier.sol", { encoding: 'utf-8' });
let content2 = fs.readFileSync("./contracts/Multiplier3Verifier.sol", { encoding: 'utf-8' });
let content3 = fs.readFileSync("./contracts/Multiplier3_plonkVerifier.sol", { encoding: 'utf-8' });
let bumped1 = content1.replace(solidityRegex, 'pragma solidity ^0.8.0');
let bumped2 = content2.replace(solidityRegex, 'pragma solidity ^0.8.0');
let bumped3 = content3.replace(solidityRegex, 'pragma solidity ^0.8.0');
bumped1 = bumped1.replace(verifierRegex, 'contract HelloWorldVerifier');
bumped2 = bumped2.replace(verifierRegex, 'contract Multiplier3Verifier');
bumped3 = bumped3.replace(plonkVerifierRegex, 'contract Multiplier3_plonkVerifier');

fs.writeFileSync("./contracts/HelloWorldVerifier.sol", bumped1);
fs.writeFileSync("./contracts/Multiplier3Verifier.sol", bumped2);
fs.writeFileSync("./contracts/Multiplier3_plonkVerifier.sol", bumped3);

// [assignment] add your own scripts below to modify the other verifier contracts you will build during the assignment