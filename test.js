const {cleanPath, dotnet, projectInfo, normalizeLineEndings, testOutput} = require("./scripts/utils");
const dotty = async function()
{
    let parentFolder = "/c/Users/kscics/Desktop/Test/Testing Space Folder/Testing Space Folder";
    let projectName = "SimpleInputs";
    
    let project = await projectInfo(parentFolder, projectName);
    let stdout = normalizeLineEndings(await dotnet(`run --project ${project.project}`, 20, "The program timed out while testing",["Kemoy Campbell", 20]));
    
    await testOutput("Testing name", stdout, "Kemoy Campbell", "included", true);

    // if(!stdout.includes("Kemoy Campbell") || !stdout.includes("Hello"))
    //   throw new Error("Your program must show Hello <the name that was entered>");

    // if(!stdout.includes('You are 20 and in 5 years time you will be 25'))
    //   return new Error("Your program didnt correctly display You are <age> and in 5 years time you will be <age in 5 years time>. Check your space and calculation");
}


dotty();