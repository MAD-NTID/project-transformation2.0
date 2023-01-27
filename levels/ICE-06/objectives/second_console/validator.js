/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {exec} = require("child_process");
const path = require('path');
const fs = require('fs');

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

  let fullPath= helper.env.TQ_GETTING_START_PATH;

  if(!fs.existsSync(fullPath)){
    return helper.fail('Incorrect-> Cannot find Program.cs in WorkingWithVisualStudioCode');
  }

  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) {
      return helper.fail(err);
    }

    if(!data.includes("Hello Nerds/Geeks!!--- I'm") || !data.includes("I am from the best hometown in the USA,"))
      return helper.fail('Incorrect information in the Console.WriteLine. Check the objective menu again');

    //attempt to ensure that the project compiled
    const { exec } = require('child_process');
    let project = fullPath.replace('Program.cs', '');

    let command = "dotnet";
    if(process.platform==='darwin')
      command = '/usr/local/share/dotnet/dotnet';

    const ls = exec(`${command} run --project ${project}`, function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        return helper.fail('An error occurred while compiling your project')
      } else if(stderr){
        console.log(stderr);
        return helper.fail('An error occurred while compiling your project')
      } else {
        // The way we usually write validators is to fail fast, and then if we reach
        // the end, we know the user got all the answers right!
        helper.success(`Hooray! You did it!`);
      }
      console.log('Child Process STDOUT: ' + stdout);
      console.log('Child Process STDERR: ' + stderr);
    });

    ls.on('exit', function (code) {
      console.log('Child process exited with exit code ' + code);
    });


  });



};
