const {spawn, ChildProcess} = require("child_process");
const kill = require('tree-kill');

const SUCCESS_EXIT = 0;

function isWindows(){
    return process.platform === 'win32'
}

function isMAC()
{
    return process.platform ==='darwin'
}

function normalizeLineEndings(text)
{
    return text.replace(/\r\n/gi, '\n').trim()
}

function indent(text){
    let str = String(text);
    str = str.replace(/\r\n/gim, '\n').replace(/\n/gim, '\n  ')
    return str
}

function cleanPath(path){
    if(isWindows() && path.includes('/c/'))
        return path.substring(2);
    
    
    return path;
}

const waitForProcessToExit = async(child, timeOut, timedOutMessage)=>
{
    return new Promise((resolve, reject)=>{
        let timedOut = false;

        //convert the timedout to ms
        timeOut = timeOut * 1000;

        /**
         * create a setTimeout function where we set the timedout
         * to true and kill the child process and reject with the
         * timeout error
         */

        const terminatedTimeout = setTimeout(()=>{
            timedOut = true;
            reject(new TimedoutError(timedOutMessage + ' in milliseconds'));
            if(child.pid)
                kill(child.pid);
        }, timeOut);

        //listening for exist event from the child process
        child.once('exit',(code, signal)=>{
            if(timedOut) return;
            //cancel the previously timeout as the program ends before the timedout occurred
            clearTimeout(terminatedTimeout);

            if(code === SUCCESS_EXIT)
                resolve(undefined);
            else
                reject(new TestCaseError(`Error: Exit with code: ${code} and signal: ${signal}`))
        });


        //listening for error event from the child process
        child.once('error', (error)=>
        {
            if(timedOut) return;

            clearTimeout(terminatedTimeout);
            reject(error);
        });


    });
}

const spawnProcess = (cmd, cwd = undefined) =>{
    //by default, we run the process in the current directory
    if(!cwd)
        cwd = '.'

    let environments = {
        PATH: process.env['PATH'],
        FORCE_COLOR: 'true',
    }

    ///we dont want to setup dontnet cli home and set the child process to have the same env as the parent
    if(isWindows()){
        cmd = cmd.replace('DOTNET_CLI_HOME=/tmp/', '');
        environments = process.env;
        environments.FORCE_COLOR = 'true';
    }

    return spawn(cmd, {
        cwd,
        shell: true,
        env: environments,
    });

}

const runProcess = async(command, timeout, timedOutMessage, inputs = [], cwd = undefined)=>{
    const child = spawnProcess(command, cwd);
    let output = '';
    let index = 0;

    // Start with a single new line
    process.stdout.write(indent('\n'))

    child.stdout.on('data', chunk => {
        process.stdout.write(indent(chunk))
        output+=chunk;

        //do we need to write the inputs to the stdin?
        if(inputs && index < inputs.length)
        {


            let input = inputs[index] + os.EOL;

            child.stdin.write(input);

            //write on the process what we input
            process.stdout.write(indent(input))
            index++;

        }

    })


    child.stderr.on('data', chunk => {
        process.stderr.write(indent(chunk))
    })


    await waitForProcessToExit(child, timeout, timedOutMessage);

    return output;
}

const testOutput = async (test, actual,expected,comparison,caseInSensitive=false)=>{
    return new Promise((resolve, reject) => {


        actual = normalizeLineEndings(actual);


        //do we need to lowercase?
        if(caseInSensitive){
            actual = actual.toLowerCase();
        }

        if(comparison!=='regex'){
            //we will normalize the expected line if it is not regex
            expected = normalizeLineEndings(expected);
            if(caseInSensitive){
                expected = expected.toLowerCase();
            }
        }

        //check the match
        switch(comparison)
        {
            case 'exact':
                if(expected!==actual)
                    reject(new TestOutputError(`The output for test ${test} didn't match `, expected, actual, comparison, caseInSensitive))
                break;

            case 'regex':

                let regex = new RegExp(expected || '');
                if(!actual.match(regex))
                    reject(new TestOutputError(`The output for test ${test} didn't match the regex`, expected, actual, comparison, caseInSensitive))
                break;

            case 'included':
                if(!actual.includes(expected))
                    reject(new TestOutputError(`The output for test ${test} didn't match`, expected, actual , comparison, caseInSensitive))
                break;

            //The default comparison mode is 'notIncluded'
            default:
                if(actual.includes(expected))
                    reject(new TestOutputError(`The output for test ${test} didn't match `, `expected to not included ${expected}`, actual,comparison, caseInSensitive))
                break;
        }

        //the test passed so we resolve
        resolve();
    })
}

async function dotnet(command, timeout, timeoutMessage, inputs = [], cwd = undefined)
{
    let dotnet = 'dotnet ';
    if(isMAC())
        dotnet = '/usr/local/share/dotnet/dotnet ';
    return runProcess(`${dotnet} ${command}`, timeout, timeoutMessage, inputs, cwd)
}

async function git(command, timeout = 15)
{
    return runProcess(`git ${command}`, timeout, `An error occurred while running the git command ${command}`);
}

module.exports = {
    git,
    normalizeLineEndings,
    isWindows,
    isMAC,
    indent,
    cleanPath,
    runProcess,
    testOutput,
    dotnet
};

