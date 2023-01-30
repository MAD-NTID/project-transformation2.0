/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
//const { isTwilio, shellCSharpExtension} = require("../lib/shell_helper");
//const { exec } = require('child_process');
const{runProcess, dotnet, testOutput, isMAC} = require('../../../../scripts/utils');

const path = require('path');
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
  const { answer1, answer2 } = helper.validationFields;

  // Next, you test the user input - fail fast if they get one of the
  // answers wrong, or some aspect is wrong! Don't provide too much
  // negative feedback at once, have the player iterate.
  if (!answer1 || (answer1!=='Y' && answer1!=='y')) {
    return helper.fail(`
      Incorrect. The answer must be Y
    `);
  }

  let command = 'code';
  if(isMAC()){
    command = '/usr/local/bin/code';
  }

  let extensions = await runProcess(`${command} --list-extensions`, 15, "The program timedout while getting the list of extensions");
  if(!extensions.includes("ms-dotnettools.csharp"))
    return helper.fail("The C# Microsoft extension for visual studio code is not installed")
  
  if(!extensions.includes("kreativ-software.csharpextensions"))
    return helper.fail("The C# Extensions JosKreativ extension for visual studio code is not installed");



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
