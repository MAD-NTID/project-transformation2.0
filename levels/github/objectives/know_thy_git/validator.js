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
  const { answer1, answer2,answer3,answer4,answer5,answer6,answer7 } = helper.validationFields;

  if(!answer1 || answer1.toLowerCase() !== 'git status')
    return helper.fail('Incorrect answer for the first question');

  if(!answer2 || (answer2.toLowerCase() !== 'git add' && answer2.toLowerCase()!=='git add .' && answer2.toLowerCase()!=='git add --all'))
    return helper.fail('Incorrect answer for the second question');

  if(!answer3 || answer3.toLowerCase() !== 'git commit')
    return helper.fail('Incorrect answer for the third question');

  if(!answer4 || answer4.toLowerCase() !== 'git push')
    return helper.fail('Incorrect answer to the fourth question');

  if(!answer5 || answer5.toLowerCase() !== 'git pull')
    return helper.fail('Incorrect answer to the fifth question');

  if(!answer6 || answer6.toLowerCase() !== 'git clone')
    return helper.fail('incorrect answer to the sixth question');

  if(!answer7 || answer7.toLowerCase() !== 'git init')
    return helper.fail('Incorrect answer to the seventh question');



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You are crushing this!!!
  `);
};
