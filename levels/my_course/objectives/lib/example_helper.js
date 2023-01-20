// This is an example of how you might use objective validation helpers
// in your own code. You don't have to, but you'll often want to!

function isPurposeOfTheSyllabus(answer){
  if(!answer || answer==='undefined')
    return false;

  answer = answer.toLowerCase();
  if(answer.includes('course is about') || answer.includes('what the course is about') || answer.includes('about the course'))
    return true;

  if(answer.includes('professor information') || answer.includes(`professor's information`) || answer.includes('information about the professor') || answer.includes('information about professor'))
    return true;

  if(answer.includes('office hour') || answer.includes(`office's hours`) || answer.includes(`office's hour`))
    return true;

  return answer.includes('how to success in the course') || answer.includes('how to get a') || answer.includes('how to get an a') || answer.includes('successful in the course');


}

function isCourseDescription(answer) {
  if(!answer || answer==='undefined')
    return false;
  answer = answer.toLowerCase();

  if(answer.includes('data types') || answer.includes('arithmetic and logical operations') || answer.includes('control structures'))
    return true;

  return answer.includes('error handling') || answer.includes('methods') || answer.includes('functions') || answer.includes('programming fundamentals');


}

function isProfessor(answer){
  if(!answer || answer==='undefined')
    return false;
  answer = answer.toLowerCase();


  /**
   * check if prof is kemoy
   */
  if(answer.includes("professor kemoy campbell") || answer.includes("professor campbell") || answer.includes("prof kemoy campbell") || answer.includes("prof kemoy"))
    return true;

  return answer.includes("kemoy campbell") || answer.includes("prof campbell") || answer.includes('professor kemoy');


}

function isTextbook(answer){
  if(!answer || answer==='undefined')
    return false;
  answer = answer.toLowerCase();

  let edition = answer.includes('fifth edition') || answer.includes('5th edition')
  return answer.includes(`the c# player's guide`) && edition;


}




module.exports = {
  isCourseDescription,
  isPurposeOfTheSyllabus,
  isProfessor,
  isTextbook
};
