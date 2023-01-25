/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/

/*
Objective validators export a single function, which is passed a helper
object. The helper object contains information passed in from the game UI,
such as what the player entered into the fields in the hack interface.

The helper object also has "success" and "fail" callback functions - use
these functions to let the game (and the player) know whether or not they 
have completed the challenge as instructed.
*/
const shell = require("../lib/utility");
module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { answer1 } = helper.validationFields;
  let project = helper.env.TQ_GITHUB_PROJECT_PATH;

  if(!project)
    return helper.fail('You are missing a step, butterfly statue & scroll mission first.');
  try{
    const stdout = await shell.git(`-C ${project} status`);
    console.log(stdout)
    if(stdout.includes("git add <file>...") && stdout.toLowerCase().includes('untracked files'))
      return helper.fail('Incorrect, there are still some files that have not been added to be tracked for changes');
  }catch (e){
    return helper.fail(e.toString());
  }

  return helper.success(`You may proceed wiz developer`);
};
