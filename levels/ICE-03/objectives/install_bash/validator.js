/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const { checkGitBash} = require("../lib/create_a_folder_helper");

//const util = require('../../../../scripts/utils');

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
  const { desktop_path} = helper.validationFields;
  let fullPath = "";

  try{

    checkGitBash();
  } catch(e){
    return helper.fail(`Incorrect--> ${e}`);
  }

  //store the path in a env variable




  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!`);
};
