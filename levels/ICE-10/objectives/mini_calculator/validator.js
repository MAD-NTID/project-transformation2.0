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
  const { answer1 } = helper.validationFields;

  let projectName = 'MiniCalculator'
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_10_CLASSROOM;





  //attempt to compile the project
  try{

    let project = await projectInfo(parentFolder, projectName);

    let data = await project.programContent;
    if(!data.includes("int.TryParse") && !data.includes("double.TryParse"))
    return helper.fail("are you forgetting TryParse?");
    let acceptables = ["const", "ADD", "SUB", "MUL", "DIV"];

    for(let i = 0; i< acceptables.length; i++){
      if(!data.includes(acceptables[i]))
        return helper.fail("Are you forgetting something? hint: "+ acceptables[i]);
    }

    let stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",[1,2,7]));
    if(!stdout.includes("+") || !stdout.includes("9"))
      return helper.fail("Your add code is incorrect!");
    
    stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",[2,2,7]));
    if(!stdout.includes("-") ||!stdout.includes("5"))
      return helper.fail("Your subtract code is incorrect");
    
      stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",[3,3,5]));
    
    if(!stdout.includes("*") || !stdout.includes("15"))
      return helper.fail("Your multiply code is incorrect!");
    
    stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 25, "The program timed out while testing",[4,20,2]));
    if(!stdout.includes("/") || !stdout.includes("10"))
      return helper.fail("Your divide code is incorrect");


  }catch(err){
    return helper.fail(err.message);
  }






  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
