function isDoWellOnAllAssignments(answer){
    return answer==='true';
}

function isCanSkipExam(answer){
    return answer==='false';
}

function isCorrectlyDefinedICE(answer){
    if(!answer || answer==='undefined')
        return false;

    console.log(answer);
    console.log(typeof answer);

    answer = answer.toLowerCase();
    return answer.includes('in-class exercise') || answer.includes('in class exercise');
}

function isCorrectICEDue(answer){
    if(!answer)
        return false;

    answer = answer.toLowerCase();

    return answer.includes('next class');
}

function isCorrectHomeworkAssigned(answer){
    if(!answer)
        return false;
    answer = answer.toLowerCase();

    return answer ==='a' || answer==='a.'
}

function isCorrectZeroGradeIfSubmitThreeDaysOrMore(answer){
    return answer === 'true';
}

function isCorrectTotalProject(answer){
    return answer === '3';
}

module.exports = {
    isDoWellOnAllAssignments,
    isCanSkipExam,
    isCorrectlyDefinedICE,
    isCorrectICEDue,
    isCorrectHomeworkAssigned,
    isCorrectZeroGradeIfSubmitThreeDaysOrMore,
    isCorrectTotalProject
};
