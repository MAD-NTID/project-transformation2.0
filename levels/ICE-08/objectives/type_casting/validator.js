/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/


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
  const { answer1, answer2 } = helper.validationFields;

  if(!answer1 || (!answer1.toLowerCase().includes('implicit') && !answer1.toLowerCase().includes('explicit')))
    return helper.fail('Incorrect answer to the question #1. Please try again');

  let regex1 = /int\s+num\s*=\s*2147483647\s*\/\s*\(int\)22.0;/;
  let regex2 = /int\s+num\s*=\s*\(\s*int\s*\)\s*\(\s*2147483647\s*\/\s*22.0\s*\);/;

  if(!answer2 || (!answer2.match(regex1) && !answer2.match(regex2)))
    return helper.fail('That is not how you fixed it. Hint: What kind of conversion issue are we dealing with?');

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
