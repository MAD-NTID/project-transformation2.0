class TimedoutError extends Error
{
    constructor(message) {
        super(`${message}`);
        Error.captureStackTrace(this, TimedOutError);
    }
}

module.exports = {
    TimedoutError
}