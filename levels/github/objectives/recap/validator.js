/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const { isTwilio } = require("../lib/example_helper");
const {forEach} = require("ramda");

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

  if(!answer1)
    return helper.fail('Please answer the first question!');
  let answer = answer1.toLowerCase().split(',');
  let accepted = ['a', 'b'];


  if(answer.length < 2 || accepted.filter(x=> !answer.includes(x)).length > 0)
    return helper.fail('Your answer(s) to the first question is incorrect.');



  if(!answer2)
    return helper.fail('Please answer the second question!');

  answer = answer2.toLowerCase();
  if(answer!=='a,c,d')
    return helper.fail('Your answer(s) to the second question is incorrect.')



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! Now we are talking!!!
  `);
};
