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
![180 Course Syllabus-01.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-01.jpg') %>)
![180 Course Syllabus-02.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-02.jpg') %>)
![180 Course Syllabus-03.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-03.jpg') %>)
![180 Course Syllabus-04.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-04.jpg') %>)
![180 Course Syllabus-05.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-05.jpg') %>)
![180 Course Syllabus-06.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-06.jpg') %>)
![180 Course Syllabus-07.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-07.jpg') %>)
![180 Course Syllabus-08.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-08.jpg') %>)
![180 Course Syllabus-09.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-09.jpg') %>)
![180 Course Syllabus-10.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-10.jpg') %>)
![180 Course Syllabus-11.jpg](<%= getImageUrl('images/syllabus/180 Course Syllabus-11.jpg') %>)