/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/

const path = require('path');
const fs = require('fs');
const {exec} = require("child_process");
const { cleanPath } = require('../../../../scripts/utils');

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

  if(!answer1) {
    return helper.fail('Please enter the absolute path for the project');
  }


  let dir = path.join(answer1,'Program.cs');
  if(!fs.existsSync(dir)){
    return helper.fail('Project is not setup correctly. Missing Program.cs?');
  }

  let command = 'dotnet';
  //mac have the dotnet executable at a specific location and the symlink doesnt seems to be available when calling through script
  if(process.platform==='darwin')
    command = '/usr/local/share/dotnet/dotnet';
  
  let proj = cleanPath(answer1);

  exec(`${command} run --project "${proj}"`, (err, stdout, stderr) => {
    if (err || stderr) {
      return helper.fail('An error occurred when running your code. Double check your logic');
    }

    // The way we usually write validators is to fail fast, and then if we reach
    // the end, we know the user got all the answers right!
    helper.success(`
    Hooray! You did it!
  `);
    return true;
  });




};