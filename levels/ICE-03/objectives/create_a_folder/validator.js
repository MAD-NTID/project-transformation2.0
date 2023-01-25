/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const { checkGitBash} = require("../lib/create_a_folder_helper");
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
  const { answer1,desktop_path} = helper.validationFields;
  let fullPath = "";

  if(!answer1 || answer1!=='cd'){
    return helper.fail('That is not the command for changing a directory. Please check the cheatsheet/ppt');
  }

  try{
    checkGitBash();
    if(!desktop_path) {
      return helper.fail('Please provide the path to the desktop');
    }


    //git bash fixer
    if(process.platform==='win32' && desktop_path.toLowerCase().includes('/c/')){

      //disregard the /c
      fullPath = path.join(desktop_path.substring(2),'programmingCommands');
    } else {
      fullPath = path.join(desktop_path,'programmingCommands');
    }

    if(!fs.existsSync(fullPath)){
      return helper.fail('Incorrect-> Please create the folder programmingCommands on the desktop');
    }
  } catch(e){
    return helper.fail(`Incorrect--> ${e}`);
  }

  //store the path in a env variable




  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!`, [{ name: "PROGRAMMING_COMMANDS", value: fullPath }]);
};
