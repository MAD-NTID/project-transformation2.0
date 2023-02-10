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
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_11_CLASSROOM;
  let project = await projectInfo(parentFolder, projectName);





  //attempt to compile the project
  try{
    let program = project.programContent;
    await testOutput("Testing for inputs prompt", program, "Console.ReadLine()", "included");
    //await testOutput("Testing for TryParse", program, "int.TryParse(.+)","regex");
    await testOutput("Testing for string interpolation", program,`\\$".+"`,"regex");

    //run the program and verify that we have the correct outputs
    let stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 30, "The program timed out while testing",["Kemoy Campbell", 20]));
    await testOutput("Testing that the correct input name is display on the output", stdout, "Kemoy Campbell", "included");
    await testOutput("Testing that Hello <name> is displayed on the Console",stdout,`Hello\\s+[A-z][a-z]+\\s+[A-z][a-z]+`,"regex");

    await testOutput("Testing that the correct current age and 5 age time ages are displayed on the console", stdout,"You are 20 and in 5 years time you will be 25","included");

    //testing not a number as input
    stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 20, "The program timed out while testing",["Kemoy Campbell", "notAnNumber"]));

    await testOutput("Testing You must enter a number for age! when the input is not a number", stdout, "You must enter a number for age!", "included");
    await testOutput("Must not show age info when the user enter a non digit age", stdout, "You are 0 and in 5 years time you will be 5", "notIncluded");

  }catch(err){
    return helper.fail(err);
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
