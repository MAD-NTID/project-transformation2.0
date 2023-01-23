/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const util = require('util');
const fs = require('fs');
const path = require('path');
const shell = require("../lib/utility");

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
  let clone_path = helper.env.TQ_GITHUB_CLONE_PATH;

  if(!clone_path)
    helper.fail('Missing a step. Go back and perform the clone exercise!');

  //did they create the project?
  let projPath = path.join(clone_path, "myfile.txt");
  console.log(fs.existsSync(projPath));
  if(!fs.existsSync(projPath))
    return helper.fail(`You didn't created the file myfile.txt`);


  //matched the console write instructions?
  const data = fs.readFileSync(projPath, 'utf8');
  if(!data.includes(`Huston...`) && !data.includes(`Sending Octocat, Github's mascot, to space is a go.`)&&
  !data.includes(`T-minus 10, 9, 8`) && !data.includes(`Godspeed Octocat!`)) {
    return helper.fail('please make sure your file myfile.txt have the right texts');
  }



  return helper.success(`Hooray! you are the G.O.A.T! Feed da ego!!!`,  [{ name: "GITHUB_PROJECT_PATH", value: projPath }]);
};
