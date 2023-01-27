/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
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
  const { answer1, answer2,answer3,answer4 } = helper.validationFields;

  if(!answer1 || (answer1!=='dotnet -h' && answer1!=='dotnet --help'))
      return helper.fail('Incorrect for the first question. The answer is in the objective tab');
  if(!answer2 || answer2!=='dotnet new console -n MyFirstProject')
    return helper.fail('Incorrect answer for the second question. run the dotnet -h again and look at the available commands');

  if(!answer3 || answer3!=='dotnet run')
    return helper.fail('Incorrect answer on how to run the program from the current directory. Use the help to see the list of available commands');

  if(!answer4 || answer4!=='dotnet run --project PF1/MyFirstProject')
    return helper.fail('Incorrect answer on how to run the program when you are not in the directory');

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
