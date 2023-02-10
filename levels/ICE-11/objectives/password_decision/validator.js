/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const { normalizeLineEndings, projectInfo, dotnet, testOutput } = require("../../../../scripts/utils");


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
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_11_CLASSROOM;

  

  try{

    //checking for const int
    let project = await projectInfo(parentFolder, projectName);
    await testOutput("Testing for constant with an int type", project.programContent, "const int", "included");

    //testing with an invalid input, aka password is not a number
    //if the student dont handle with try parse, dotnet will throw the exception
    let stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",["tony", "jarvisTheBestAI!"]));

    await testOutput("Testing display Password must be a digit when the user enter a non digit for the password", stdout, "Password must be a digit", "included");

    stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",["tony", "124687"]));

    await testOutput("Testing Welcome Tony Stark", stdout, "Welcome Tony Stark!", "included");

    stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",["tony", "1246879999"]));

    await testOutput("Testing incorrect username or password", stdout, "Incorrect username or password!","included");


  }catch(err){
    return helper.fail(err);
  }

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
