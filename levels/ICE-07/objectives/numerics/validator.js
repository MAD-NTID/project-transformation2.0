/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
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
  const { answer1, answer2, answer3 } = helper.validationFields;

  if(!answer1 || answer1!=='int')
    return helper.fail('Incorrect answer provided for question #1');
  if(!answer2 || answer2!=='decimal')
    return helper.fail('Incorrect answer provided for question #2');
  if(!answer3 || (!answer3.includes('wrap') && !answer3.includes('overflow') && !answer3.includes('wrap-around') && !answer3.includes('wraparound')))
    return helper.fail('Incorrect answer provided for question #3')

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You really did a number on this one :-)
  `);
};
