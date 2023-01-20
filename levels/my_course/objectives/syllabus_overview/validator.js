/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const {isCourseDescription, isPurposeOfTheSyllabus, isProfessor, isTextbook} = require("../lib/example_helper");

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
  const { answer1, answer2, answer3, answer4 } = helper.validationFields;

  if(!isPurposeOfTheSyllabus(answer1))
    return helper.fail('Incorrect answer provided for the purpose of the syllabus. Please read the syllabus again');

  if(!isCourseDescription(answer2))
    return helper.fail('Incorrect answer provided for the course description. Please read the course description on the syllabus again');

  if(!isProfessor(answer3))
    return helper.fail('Incorrect answer provided for the name of your professor. Please try again');

  if(!isTextbook(answer4))
    return helper.fail('Incorrect answer provided for the textbook. Please take a look at the name of the required textbook on the syllabus again');


  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  console.log(helper.settings);
  helper.success(`You are rocking it!!!`);
};
