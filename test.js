const {cleanPath, dotnet, projectInfo,} = require("./scripts/utils");
const dotty = async function()
{
    
    let project = await projectInfo('/home/cypher/Desktop/Test/Testing Space Folder/Testing Space Folder/WorkingWithVisualStudioCode');
    let info = await dotnet(`run --project ${project.project}`, 15);
}


dotty();