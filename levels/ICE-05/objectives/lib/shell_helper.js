const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

function shellCorrectVersion(command)
{
    exec(command, (err, stdout, stderr) => {
        if (err) {
            throw err;
        }
        if(!stdout.includes('6.0')){
            throw 'Wrong version installed';
        } else {
            if(stderr)
                throw stderr;
        }

        return stdout
    });
}

function shellVSC(command)
{
    exec(command, (err, stdout, stderr) => {
        if (err) {
            throw err;
        }

        return stdout
    });
}

function shellCSharpExtension(command)
{
    exec(command, (err, stdout, stderr) => {
        if(err) {
            throw err;
        } else if(stderr){
            throw err;
        }

        console.log(stdout);

        if(!stdout.includes('ms-dotnettools.csharp')){
            throw 'C# Extension for VSC Missing!!';
        }
    });
}

function shellCSharpHelloWorld(path, command)
{
    let dir = path.join(path,'Program.cs');
    if(!fs.existsSync(dir)){
        throw 'Project is not setup correctly. Missing Program.cs?';
    }
    exec(`${command} ${dir}`, (err, stdout, stderr) => {
        if (err) {
            throw err;
        }

        return true;
    });
}


module.exports = {
    shellCorrectVersion,
    shellCSharpExtension,
    shellCSharpHelloWorld,
    shellVSC
}