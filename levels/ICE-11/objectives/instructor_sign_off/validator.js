/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const { match } = require("assert");
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");

/*
Objective validators export a single function, which is passed a helper
object. The helper object contains information passed in from the game UI,
such as what the player entered into the fields in the hack interface.

The helper object also has "success" and "fail" callback functions - use
these functions to let the game (and the player) know whether or not they 
have completed the challenge as instructed.
*/
module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { answer1 } = helper.validationFields;
  var crypto = require('crypto');

  const secret = 'IChallengeYouStudentBreakIt873940582208';

  if(!answer1)
    return helper.fail("See your instructor for the sign off... There is no point guessing!");
 
// Calling createHash method
const hash = crypto.createHash('sha256', secret)
                    
                   //the message to encrypt
                   .update(answer1)
 
                   // Encoding to be used
                   .digest('hex');

  let matches = [
    'fa8dc8d0082296f15bb57f00a13d2b67895a2a1b18aa0ef610c50c0747e43958',
    '7e3b799398e613e6c350ed8f41deea1d04e12588e3dd56cc9233e576d7072215'
  ]

  if(!matches.includes(hash))
    return helper.fail("See your instructor for the sign off... There is no point guessing!");


  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
