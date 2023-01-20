class TestCaseError extends Error{
    constructor(message){
        super(message);
        Error.captureStackTrace(this, TestCaseError);
    }
}