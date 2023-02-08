/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/

const { projectInfo, dotnet, normalizeLineEndings, testOutput } = require("../../../../scripts/utils");

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
  let projectName = 'SimpleInputs'
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_10_CLASSROOM;


  //attempt to compile the project
  try{
    let project = await projectInfo(parentFolder, projectName)
    let stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 20, "The program timed out while testing",["Kemoy Campbell", 20]));

    if(!stdout.includes("Kemoy Campbell") || !stdout.includes("Hello"))
      return helper.fail("Your program must show Hello <the name that was entered>");

    if(!stdout.includes('You are 20 and in 5 years time you will be 25'))
      return helper.fail("Your program didnt correctly display You are <age> and in 5 years time you will be <age in 5 years time>. Check your space and calculation");

  }catch(err){
    return helper.fail(err.message);
  }

  // //interact with the program
  // const spawn = require('child_process').spawn;
  // const child = spawn(`${dotnetExecutionBinary()} run --project ${project}`);
  //
  //
  // child.stdout.on('data', (data) => {
  //   helper.fail(data);
  //   console.log(`stdout: "${data}"`);
  // });
  //
  // child.stdin.write("Kemoy Campbell\n");
  // //child.stdin.end(); // EOF
  //
  // child.on('close', (code) => {
  //   console.log(`Child process exited with code ${code}.`);
  // });


  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
