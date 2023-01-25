const { exec } = require('child_process');

function checkGitBash()
{
    exec('git --version', (err, stdout, stderr) => {
        if (err) {
            throw 'Git bash not installed';
        }

        return true;
    });
}

module.exports = {
    checkGitBash
}