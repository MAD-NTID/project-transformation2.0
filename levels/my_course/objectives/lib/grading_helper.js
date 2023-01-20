function isInstructorRequiredToRoundUp(answer)
{
    return answer==='false';
}

function isLetterCDFSameAsOtherCourses(answer)
{
    return answer ==='false';
}

function isAceGrade(answer)
{
    if(!answer)
        return false;


    try{
        let number = parseInt(answer);
        return number >=94 && number<=100;
    } catch(error){

        return answer.includes("94") && answer.includes("100");
    }
}

function isBPlusGrade(answer){
    if(!answer)
        return false;


    try{
        let number = parseInt(answer);
        return number >=87 && number<=89;
    } catch(error){

        return answer.includes("87") && answer.includes("89");
    }
}

function is75Minimum(answer) {
    if(!answer)
        return false;

    return answer === '75' || answer ==='75%' || answer.toLowerCase() ==='c';
}

module.exports = {
    isInstructorRequiredToRoundUp,
    isLetterCDFSameAsOtherCourses,
    isAceGrade,
    isBPlusGrade,
    is75Minimum,


}


