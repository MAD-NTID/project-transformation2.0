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
    return helper.fail('You are missing a step, complete the create a new project and working with VSC exercise first');
  try{
    project = project.replace(/(\s+)/g, '\\$1');
    const stdout = await shell.git(`-C ${project} status`);
    console.log(stdout);
    if(stdout.toLowerCase().includes('your branch is ahead') || stdout.toLowerCase().includes('nothing to commit, working tree clean'))
      return helper.success(`Let's Go!!!`);

    return helper.fail("You didn't commit your changes");
  }catch (e){
    return helper.fail(e.toString());
  }


};
