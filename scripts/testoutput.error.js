class TestOutputError extends Error
{
    constructor(message, expected, actual, comparision,sensitivity) {
        super(`${message}\nExpected:\n${expected}\nActual:\n${actual}\nCase Insensitive:\n${sensitivity || 'NA'}\nComparison:\n${comparision}`)
        this.expected = expected
        this.actual = actual
        Error.captureStackTrace(this, TestOutputError);
    }

}

module.exports = {
    TestOutputError
}