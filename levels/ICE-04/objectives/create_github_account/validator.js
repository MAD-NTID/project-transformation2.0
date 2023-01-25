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
  const { username } = helper.validationFields;

  if (!username) {
    return helper.fail(`Please enter the username of your GitHub account!`);
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);

    if (response.status=== 200) {
      return helper.success(
          `We found your GitHub user, ${username}. Good job!`,
          [{ name: "GITHUB_USERNAME", value: username }]
      );
    } else {
      return helper.fail(
          `We couldn't find the GitHub user, ${username}. Is there a typo in the username?`
      );
    }
  } catch (err) {
    if(err.response.status===404){
      return helper.fail(
          `We couldn't find the GitHub user, ${username}. Is there a typo in the username? Make sure you sign up for github, verified your email before entering it in the box here`
      );
    }
    return helper.fail(
        `Something went wrong when we tried to validate your GitHub username!
      
      ${err}`
    );
  }
};
