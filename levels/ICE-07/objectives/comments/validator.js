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

  if(!answer1 || answer1!=='2')
    helper.fail('Incorrect answer for the first question');

  if(!answer2 || answer2.includes('//'))
    helper.fail('That is not how you write a single line comment. All I can say is... Try again');

  if(!answer3 || (!answer3.includes('/*') && !answer3.includes('*/')) )
    return helper.fail('mmmhmm... That is not how we write a block comment. Give it another shot?');

  if(!answer4 || answer4!=='true')
    helper.fail('Comments are ignored by the computer');

  if(!answer5 || (!answer5.includes('human') && !answer5.includes('developers') && !answer5.includes('software engineers') && !answer5.includes('programmer') && !answer5.includes('document')
  && !answer5.includes('team') && !answer5.includes('classmate') && !answer5.includes('readers') && !answer5.includes('reviewers'))
  )
    return helper.fail('Incorrect answer to the 5th question');



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
