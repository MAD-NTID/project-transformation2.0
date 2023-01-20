/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio, isChannels, isSecretCode, isCanDo} = require("../lib/join_helper");

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

  if(!isChannels(answer1))
    return helper.fail('Incorrect answer! Check the list of channels on NMAD-180 discord again');

  if(!isSecretCode(answer2))
    return helper.fail('Incorrect secret code! Please copy and paste the secret code');

  if(!isCanDo(answer3))
    return helper.fail('Incorrect answer! Please check the communication section in the objective again');

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`Whoa!!! There is no stopping you now, you are on a roll!`);
};
