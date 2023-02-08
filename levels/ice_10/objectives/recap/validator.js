/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/

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
  const { answer1, answer2, answer3,  answer4, answer5, answer6 } = helper.validationFields;

  if(!answer1 || (answer1!=='Console.ReadLine()' && answer1!=='Console.ReadLine();'))
    return helper.fail('Incorrect answer for question #1');
  if(!answer2 || answer2.toLowerCase()!=='console')
    return helper.fail("Incorrect answer for question #2");

  if(!answer3 || !["bool", "boolean"].includes(answer3.toLowerCase()))
    return helper.fail("Incorrect answer for question #3");

  if(!answer4 || !answer4.includes("int.Parse"))
    return helper.fail("Incorrect answer for question #4");

  if(!answer5 || answer5.toLowerCase()!=='true')
    return helper.fail("Incorrect answer for question #5");

  if(!answer6 || (answer6.toLowerCase()!=='false' && answer6.toLowerCase()!=='not true' && answer6.toLowerCase()!=='!true'))
    return helper.fail("Incorrect answer for question #6");

  helper.success("Hooray!!! You are ready to face new challenges!");

};
