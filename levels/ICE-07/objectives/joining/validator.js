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
  const { answer1, answer2} = helper.validationFields;

  let concatRegex = /Console.WriteLine\(\s*firstName\s*\+\s*\" \"\s*\+\s*lastName\);/
  if(!answer1 || !answer1.match(concatRegex))
    return helper.fail('That is not the correct answer for the first question. Please try again');

  let replacementRegex = /Console.WriteLine\(\"\{0} is a \{1} year\(s\) student. He will be graduating in \{2} years.\",\s*name,\s*yearInCollege,\s*yearsToGraduate\);/;

  if(!answer2 || !answer2.match(replacementRegex))
    return helper.fail(`Incorrect. This might take some practices. Don't give up. Try again.`)


  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
