class TimedoutError extends Error
{
    constructor(message) {
        super(`${message}`);
        Error.captureStackTrace(this, TimedoutError);
    }
}

module.exports = {
    TimedoutError
}