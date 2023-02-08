/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const path = require('path');
const fs = require('fs');
const {readFile, normalizeLineEndings, dotnet, projectInfo} = require("../../../../scripts/utils");
const { Console } = require('console');

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
  const { answer1 } = helper.validationFields;

  if(!answer1 || (answer1!=='Y') && answer1!=='y')
    return helper.fail('Y/N');


  if(!helper.env.TQ_GETTING_START_PATH) {
    return helper.fail('You need to complete the create a new project step first!');
  }


  let fullName = helper.env.TQ_FULL_NAME.split(" ");
  let hometown = helper.env.TQ_HOME_TOWN;


  try {
    let project = await projectInfo(helper.env.TQ_GETTING_START_PATH);
    //reading the file data
    const data = project.programContent;
    if(data.length === 0)
      return helper.fail("Program.cs cannot be empty!");

    if(!data.includes("Console.WriteLine()") && !data.includes('Console.WriteLine("")') && !data.includes('\\n'))
      return helper.fail('That is not how you add the space. Try again');

    //attempting to run the project

    const stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 15, "The program timed out while attempting to run your project with dotnet run"));

    let lines = stdout.split("\n");

    if(lines.length < 3) {
      return helper.fail("You need to have at least 3 blank lines in your program!");
    }

    if(!stdout.includes("Hello Nerds/Geeks!!--- I'm"))
      return helper.fail("Hello Nerds/Geeks!!--- I'm is missing from the console! please check the objective menu and try again");


    if(stdout.includes("<first name>"))
      return helper.fail("replace <first name> with your first name");

    if(stdout.includes("<last name>"))
      return helper.fail("replace <last name> with your last name");


    if(!stdout.includes(fullName[0]) || !stdout.includes(fullName[1]))
      return helper.fail("You must include you first and last name in the console. Check the objective menu for the sample output and try again");

    if(!stdout.includes("I am from the best hometown in the USA,") || !stdout.includes(`${hometown}`))
      return helper.fail("Please enter your hometown information in Program.cs following the instruction in the objective menu");


    helper.success(`Congratulation on completing the assignment. You deserve a pat on the back!`);


  }catch(e)
  {
    return helper.fail(e.message);
  }




};
