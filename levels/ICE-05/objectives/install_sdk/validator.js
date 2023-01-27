/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const { shellCorrectVersion} = require("../lib/shell_helper");
const{runProcess, dotnet} = require('../../../../scripts/utils');

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
  const { answer1} = helper.validationFields;

  if(!answer1 || (answer1!=='6' && answer1!=='7')) {
    return helper.fail('Incorrect, that is not the correct version');
  }

  try{
    let version = await dotnet('--version', 15, 'The program timed out while checking for the .NET SDK version');
    version = version.split(".");

    if(version[0]!="6" && version!="7")
      return helper.fail("Wrong version installed");
  } catch (e){
    if (!e.includes("time")){
      e =  `Incorrect. SDK not installed. Please install the SDK`
    }
    return helper.fail(e);
  }



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
