<%

    const path = require('path');
    const fileUrl = require('file-url');
    
    function getImageUrl(extRelativePath) {
     
        try {
            const imagePath = path.join(
            context.extensions.directory,
            'project-transformers',
            extRelativePath
            );
            return fileUrl(imagePath)
        } catch (e) {
            console.log('embedded image path not found:', path);
            console.log(e);
            // A default image that exists in the app bundle
            return 'images/app/shield.png';
        }
    }
%>

# The importance of the Syllabus

## What is a syllabus
A syllabus is a document that contains information on what the course is about, professor information, office hours and
what is required for you to be successful in the course.


### NMAD 180 Syllabus
Read the syllabus on myCourse and answer the questions.