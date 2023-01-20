

function isChannels(answer) {
  if(!answer)
    return false;

  answer = answer.toLowerCase();

  return answer.includes('welcome-and-rules') || answer.includes('general') || answer.includes('homework-help') ||
      answer.includes('notes-resources') || answer.includes('random');
}

function isSecretCode(answer){
  return answer === 'NMAD-180-LET_US_DO_THIS2.0';
}

function isCanDo(answer){
  if(!answer)
    return false;

  answer = answer.toLowerCase();

  if(answer.includes('clarification') || answer.includes('clear'))
    return true;

  if(answer.includes('assist') || answer.includes('debug') || answer.includes('compile') || answer.includes('issue'))
    return true;

  if(answer.includes('announce') || answer.includes('homework') || answer.includes('project') || answer.includes('ice'))
    return true;
}

module.exports = {
  isChannels,
  isSecretCode,
  isCanDo
};
