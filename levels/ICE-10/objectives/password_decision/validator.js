/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/

const { normalizeLineEndings, projectInfo, dotnet } = require("../../../../scripts/utils");


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
  let projectName = 'PasswordDecision'
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_10_CLASSROOM;


    //attempt to compile the project
  try{

    let project = await projectInfo(parentFolder, projectName);
    let stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",["tony", "jarvisTheBestAI!"]));

    //testing successful password
    if(!stdout.includes("Welcome Tony Stark!"))
      return helper.fail("You must print Welcome Tony Stark! on successful login");

    //testing invalid username and password
    stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",["tony", "jarvisTheBestAI3333"]));

    if(!stdout.includes("Incorrect username or password!"))
      return helper.fail("You must print Incorrect username or password! if the user enter the incorrect username or password");

  }catch(err){
    return helper.fail(err.message);
  }




  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
