/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio, isAceGrade, isInstructorRequiredToRoundUp, isLetterCDFSameAsOtherCourses, isBPlusGrade, is75Minimum} = require("../lib/grading_helper");

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
  const { answer1, answer2, answer3, answer4,answer5 } = helper.validationFields;

  if(!isInstructorRequiredToRoundUp(answer1))
    return helper.fail('Incorrect answer.Please read the "Rounding of Final Grade" section again');

  if(!isLetterCDFSameAsOtherCourses(answer2))
    return helper.fail('Incorrect answer. Please read the note regarding the grade letters of C,D and F');

  if(!isAceGrade(answer3))
    return helper.fail('Incorrect answer. Pleaser read the table again on what grade average is A');

  if(!isBPlusGrade(answer4))
    return helper.fail('Incorrect answer. Please read the table again on what grade average is B+');

  if(!is75Minimum(answer5))
    return helper.fail('Incorrect answer. Please review the minimum require grade in order to be able to take NMAD 181 and other courses');

  helper.success('Onward!!!');

};
