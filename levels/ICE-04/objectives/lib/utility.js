const util = require('util');
const {default: axios} = require("axios");
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const procexec = require('child_process').exec;
const kill  = require('tree-kill');
const os = require("os");

const path = require('path');

const TIMEOUT_IN_SECOND = 15;

//const variables
const forLoopRegex = /for\s*\(\s*[a-z]+\s*[a-z]+\s*=\s*\d+\s*;\s*[a-z]+\s*[<>=!]\s*\d+\s*;\s*[a-z]*\s*[\+-]{2}\s*\)\s*/gm
const whileRegex = /while\s*\(\s*.+\s*\)\s*/gm
const doWhileRegex = /do\s*{.*\s*}/gm;

const normalizeLineEndings = (text) => {
    return text.replace(/\r\n/gi, '\n').trim()
}

async function log(content, trace){
    let logFile = path.resolve(__dirname, '../../../../logs/log.txt');

    let log = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true }) + ' - ' + content + '\n';
    if(trace)
        log+='stack trace:' + trace + '\n';

    await fs.appendFile(logFile, log, function(err) {
        if(err)
            throw err;

        console.log('log saved!');

    });
    //await fs.appendFile()
}

async function getInputsFromFile(filename){
    let inputPath = path.resolve(__dirname, '../../../../inputs');

    if(!filename.includes("/"))
        inputPath = path.resolve(inputPath, filename);
    else{
        let items = filename.split("/");
        for(let i = 0;i < items.length; i++)
            inputPath = path.resolve(inputPath,items[i]);
    }
    const result = await readFileAsync(inputPath);
    return result.split("\n");
}

async function readFileAsync(filename){
    return new Promise((resolve, reject)=>{
      fs.readFile(filename, 'utf-8', (err, data)=>{
        if(err)
          reject(new Error(err));
          
        resolve(data);
      })
    })
  }

async function dotnet(command)
{
    let dotnet = 'dotnet ';
    if(process.platform==='darwin')
        dotnet = '/usr/local/share/dotnet/dotnet ';

    const { stdout, stderr } = await exec(`${dotnet} ${command}`);
    if(stderr)
        throw stderr;
    return stdout;
}

function dotnetExecutionBinary(){
    let execution = 'dotnet';
    if(process.platform === 'darwin')
        execution = '/usr/local/share/dotnet/dotnet'

    return execution;
}

async function git(command)
{
    const { stdout, stderr } = await exec(`git ${command}`);
    if(stderr)
        throw stderr;
    console.log(stdout);
    return stdout;
}

async function checkGithubUsername(username)
{
    if(!username)
        throw "Please provide your github username";


    try{
        const response = await axios.get(`https://api.github.com/users/${username}`);
        if(response.status===200)
            return true;

        throw `We couldn't find the GitHub user, ${username}. Is there a typo in the username?`;
    }catch(err){
        if(err.response.status===404)
            throw `We couldn't find the GitHub user, ${username}. Is there a typo in the username? Make sure you sign up for github, verified your email before entering it in the box here`;
        throw err;
    }

}

function cleanPath(path){
    if(process.platform==='win32' && path.includes('/c/'))
        return path.substring(2);

    return path;
}

function isFolderExist(path)
{
    if(!path)
        throw "Please provide the path!";
    path = cleanPath(path);
    console.log(path);
    if(!fs.existsSync(path))
        throw 'Invalid path! the path is not a folder and doesnt exist!';
}


async function wait(seconds, child)
{
    let timeout = seconds * 1000;

    return new Promise((resolve, reject)=>
    {
        let timedOut = false;


        /**
         * create a setTimeout function where we set the timedout
         * to true and kill the child process and reject with the
         * timeout error
         */
        const terminatedTimeout = setTimeout(()=>{
            timedOut = true;
            reject(new Error('input testing timeout in millseconds'))
            if(child.pid)
                kill(child.pid);
        }, timeout);


        //listening for exit event from the child process
        child.once('exit',(code, signal)=>
        {
            if(timedOut) return;

            //cancel the previously timeout as the program ends before the timedout occurred
            clearTimeout(terminatedTimeout);

            //the process exit with no error
            resolve(undefined);

        });

        //listening for error event from the child process
        child.once('error', (error)=>
        {
            if(timedOut) return;

            clearTimeout(terminatedTimeout);
            reject(error);
        });

    })


}

const indent = (text)=> {
    let str = String(text);
    str = str.replace(/\r\n/gim, '\n').replace(/\n/gim, '\n  ')
    return str
}

async function child_process_inputs(child, inputs)
{
    let contents = '';
    let errors = '';
    let index = 0;

    // Start with a single new line
    process.stdout.write(indent('\n'))

    child.stdout.on('data',(data)=>{
        contents+=data;

        console.log(indent(data));
        //any remaining inputs from our tests?
        if(index < inputs.length)
        {
            child.stdin.write(inputs[index] + os.EOL);

            index++;
        }

    });

    child.stderr.on('data', (data)=>{
        process.stderr.write(indent(data));
        errors+=data
    });

    await wait(TIMEOUT_IN_SECOND, child);

    if(errors)
        throw new Error(normalizeLineEndings(errors));

    return normalizeLineEndings(contents);

}

async function test_inputs(timeout_in_second, cmd, inputs)
{
    console.log("The input length is: "+inputs.length);
    let child = procexec(cmd);
    try{

        return await child_process_inputs(child, inputs);
    }catch(err) {
        if(err.message.includes('timeout')) {
            throw 'Your program timed out. You might have more inputs than required or your program hangs. If you are using loop, your loop likely went on forever!';
        }

        kill(child.pid);
        throw err;
    }
}


async function run_test_cases_from_file(command, timeout_in_second,input_test_cases_file)
{

    let inputs = await getInputsFromFile(input_test_cases_file);
    let res = await test_inputs(timeout_in_second, command, inputs);

    return {
        output: res,
        inputs: inputs
    }

}

function hasForLoop(contents)
{
    return contents.includes('for(')
    return contents.match(forLoopRegex);
}

function hasWhileLoop(contents)
{
    return contents.includes('while(')
    return contents.match(whileRegex);
}

function hasDoWhile(contents)
{
    return contents.includes('do{')
}

function hasLoop(contents)
{
    return hasForLoop(contents) || hasWhileLoop(contents) || hasDoWhile(contents);
}

function hasForEach(contents)
{
    return contents.includes('foreach(');
}

function stripSpaces(content)
{
    return content.replace(/\s+/g, '');
}

module.exports = {
    dotnet,
    git,
    checkGithubUsername,
    isFolderExist,
    dotnetExecutionBinary,
    test_inputs,
    readFileAsync,
    wait,
    child_process_inputs,
    log,
    getInputsFromFile,
    run_test_cases_from_file,
    stripSpaces,
    hasLoop,
    hasForLoop,
    hasWhileLoop,
    hasDoWhile,
    hasForEach,
    projectInfo,
    normalizeLineEndings
}

async function projectInfo(parentFolder,projectName)
{
    if(!parentFolder)
        throw "Did you forget to clone the github classroom?";

    let project = path.resolve(parentFolder,projectName);
    let fullPath = path.resolve(project,'Program.cs');

    isFolderExist(project);
    let programFile = await readFileAsync(fullPath);

    return {
        parent:parentFolder,
        project:project,
        programCS:fullPath,
        contents: normalizeLineEndings(programFile)
    }
}

