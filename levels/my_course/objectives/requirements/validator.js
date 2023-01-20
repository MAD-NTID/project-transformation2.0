/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isDoWellOnAllAssignments, isCanSkipExam, isCorrectlyDefinedICE, isCorrectICEDue, isCorrectHomeworkAssigned,
  isCorrectZeroGradeIfSubmitThreeDaysOrMore, isCorrectTotalProject
} = require("../lib/requirements_helpers");

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
  const { answer1, answer2, answer3, answer4,answer5,answer6,answer7} = helper.validationFields;

  if(!isDoWellOnAllAssignments(answer1)) {
    return helper.fail("Incorrect answer. Please read 'The requirements regarding the assignments' again.");
  }

  if(!answer2 || !isCanSkipExam(answer2)) {
    return helper.fail("Incorrect answer. Please read the exam section on the requirement again");
  }

  if(!isCorrectlyDefinedICE(answer3)) {
    return helper.fail("Incorrect answer. Please read the ICE section again")
  }

  if(!isCorrectICEDue(answer4)) {
    return helper.fail("Incorrect answer. Please read the ICE section again.")
  }

  if(!isCorrectHomeworkAssigned(answer5)) {
    return helper.fail('Incorrect answer. Please read the homework section again');
  }

  if(!isCorrectZeroGradeIfSubmitThreeDaysOrMore(answer6)) {
    return helper.fail("Incorrect answer. Please read the late homework policy section again");
  }

  if(!isCorrectTotalProject(answer7)){
    return helper.fail("Incorrect answer. Please read the project section again");
  }


  helper.success(`
    Easy plz!, Now you know what you need to get an A in this course!');
  `);
};
