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
  const { answer1, answer2, answer3, answer4,answer5,answer6 } = helper.validationFields;

  if(!answer1 || answer1.toLowerCase().replace("operator", "")!=='and')
    return helper.fail("Incorrect answer for question #1");

  if(!answer2 || answer2.toLowerCase().replace("operator", "")!=='or')
    return helper.fail("Incorrect answer for question #2");

  if(!answer3 || answer3!=='==')
    return helper.fail('Incorrect answer for question #3');

  if(!answer4 || answer4!=='!=')
    return helper.fail("Incorrect answer for question #4");

  if(!answer5 || answer5!=='!')
    return helper.fail('Incorrect answer for question #5');

  if(!answer6 || answer6.toLowerCase()!=='true')
    return helper.fail("Incorrect answer for question #6");



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
