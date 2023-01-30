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
  const { answer1, answer2, answer3,answer4,answer5 } = helper.validationFields;

  if(!answer1 || (!answer1.includes('storage location') && !answer1.includes('named container')))
    return helper.fail('incorrect answer for the first question');

  if(!answer2 || answer2!=='true')
    return helper.fail('Incorrect answer for the second question');


  let ageRegex = /int[\s+]age[\s+]=\s*\d+;/;
  if(!answer3 || !answer3.match(ageRegex))
    return helper.fail('Incorrect answer for the third question');

  let balanceRegex = /double[\s+]balance[\s+]=\s*250.00;/;
  if(!answer4 || !answer4.match(balanceRegex))
    return helper.fail('Incorrect answer provided for the fourth question');

  //let nameRegex = /string[\s+]name[\s+]=[\s+]"[a-zA-Z]+ [a-zA-Z]+";/
  let nameRegex = /string[\s+]name[\s+]=[\s+]"{1}[a-zA-Z]+ [a-zA-Z]+"{1};/gm
  if(!answer5 || !answer5.match(nameRegex))
    return helper.fail("Incorrect answer provided for the fifth question");



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You are doing awesome!
  `);
};
