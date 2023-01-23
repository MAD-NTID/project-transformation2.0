/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const axios = require('axios').default;
const util = require('util');
const exec = util.promisify(require('child_process').exec);
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
  const { answer1 } = helper.validationFields;
  let username = helper.env.TQ_GITHUB_USERNAME;

  let path = answer1;

  if(process.platform==='win32' && answer1.includes('/c/'))
    path = answer1.substring(2); //do not include /c for windows

  if(!fs.existsSync(path))
    return helper.fail('Invalid path! the path is not a folder and doesnt exist!');
  try{
    const { stdout, stderr } = await exec(`git -C ${path} status`);
    if(stderr)
      throw stderr;

    return helper.success(`Hooray! shadow clones, let us go!!!`, [{ name: "GITHUB_CLONE_PATH", value: path }]);
  }catch(e)
  {
    if(e.toString().includes('not a git repository'))
      return helper.fail(`Incorrect. The folder doesnt contain .git. Please input the absolute path to my-first-github-${username}`)
    return helper.fail(e);
  }



};
