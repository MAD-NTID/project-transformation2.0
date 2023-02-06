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
const {cleanPath, normalizeLineEndings, readFile, dotnet} = require("../../../../scripts/utils");

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
  const { answer0, answer1 } = helper.validationFields;

  if(!answer0 || answer0.length === 0)
    return helper.fail("Please enter your hometown!");

  if(!answer1 || (answer1!=='Y') && answer1!=='y')
    return helper.fail('Y/N');




  if(!helper.env.TQ_GETTING_START_PATH) {
    return helper.fail('You need to complete the create a new project step first!');
  }

  let fullPath= path.join(helper.env.TQ_GETTING_START_PATH, "Program.cs");
  let project = helper.env.TQ_GETTING_START_PATH;
  let fullName = helper.env.TQ_FULL_NAME.split(" ");



  try {

    if(!fs.existsSync(fullPath)){
      return helper.fail('Project is not setup correctly. Missing Program.cs?');
    }
    //reading the file data
    const data = normalizeLineEndings(await readFile(fullPath));
    if(data.length === 0)
      return helper.fail("Program.cs cannot be empty!");

    //attempting to run the project

    const stdout = await dotnet(`run --project "${project}"`, 15, "The program timed out while attempting to run your project with dotnet run");

    if(!stdout.includes("Hello Nerds/Geeks!!--- I'm"))
      return helper.fail("Hello Nerds/Geeks!!--- I'm is missing from the console! please check the objective menu and try again");


    if(stdout.includes("<first name>"))
      return helper.fail("replace <first name> with your first name");

    if(stdout.includes("<last name>"))
      return helper.fail("replace <last name> with your last name");


    if(!stdout.includes(fullName[0]) || !stdout.includes(fullName[1]))
      return helper.fail("You must include you first and last name in the console. Check the objective menu for the sample output and try again");

    if(!stdout.includes("I am from the best hometown in the USA,") || !stdout.includes(`${answer0}`))
      return helper.fail("Please enter your hometown information in Program.cs following the instruction in the objective menu");

    helper.success(`Hooray! You did it!`, [{name:"HOME_TOWN",value:answer0}]);

  }catch(e)
  {
    return helper.fail(e.message);
  }

  if(!fs.existsSync(fullPath)){
    return helper.fail('Incorrect-> Cannot find Program.cs in WorkingWithVisualStudioCode');
  }




};
