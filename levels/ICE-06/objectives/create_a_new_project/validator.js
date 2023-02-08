/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const { isTwilio } = require("../lib/example_helper");
const {exec} = require("child_process");
const path = require('path');
const fs = require('fs');
const {cleanPath, readFile, normalizeLineEndings, dotnet, projectInfo} = require("../../../../scripts/utils");

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
  const { answer0,answer1, answer2} = helper.validationFields;

  if(!answer0 || answer0.length === 0)
    return helper.fail("Please enter your first and last name");

  let fullName = answer0.split(" ");
  if(fullName.length < 2)
    return helper.fail("You must enter both your first and last name separate by a space. Example:Kemoy Campbell");


  if(!answer1 || (answer1!=='Console.WriteLine' && answer1!=='Console.WriteLine()' && answer1 !== 'Console.WriteLine();'))
    return helper.fail('Incorrect answer regarding the second question. Please review the ppt slides');

  if(!answer2)
    return helper.fail('The absolute path cannot be empty!');


  if(!answer2.endsWith("WorkingWithVisualStudioCode")){
    return helper.fail('The name of your project doesnt appeared to be correct. Your project should be named WorkingWithVisualStudioCode and the directory path must ends with WorkingWithVisualStudioCode');
  }

  try {
    let project = await projectInfo(answer2);

    //reading the file data
    const data = project.programContent;
    if(data.length === 0)
      return helper.fail("Program.cs cannot be empty!");



    const stdout = await dotnet(`run --project ${project.project}`, 15, "The program timed out while attempting to run your project with dotnet run");

    if(!stdout.includes("Hello Nerds/Geeks!!--- I'm"))
      return helper.fail("Hello Nerds/Geeks!!--- I'm is missing from the console! please check the objective menu and try again");


    if(stdout.includes("<first name>"))
      return helper.fail("replace <first name> with your first name");

    if(stdout.includes("<last name>"))
      return helper.fail("replace <last name> with your last name");


    if(!stdout.includes(fullName[0]) || !stdout.includes(fullName[1]))
      return helper.fail("You must include you first and last name in the console. Check the objective menu for the sample output and try again");

    helper.success(`Hooray! You did it!`,  [{ name: "GETTING_START_PATH", value: cleanPath(project.project)},{name:"FULL_NAME", value:answer0}]);

  }catch(e)
  {
    return helper.fail(e.message);
  }












};
