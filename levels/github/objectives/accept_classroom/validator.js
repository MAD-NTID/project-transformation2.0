/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const axios = require('axios').default;

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
  const { link } = helper.validationFields;
  let username = helper.env.TQ_GITHUB_USERNAME;

  if(!username)
    return helper.fail('Create and link your github username first! Skipping much?');

  if(!link)
    helper.fail('Please enter the repository link!');



  if(link.replace('.git', '') !== `https://github.com/MAD-NTID/ice-05-${username}`)
    return helper.fail('Incorrect repository link provided. Please copy the link that was created after you accepted the invite and refreshed the page');

  return helper.success(`Hooray! We are about to go to space!!!`);
};
