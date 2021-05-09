# Time table web application

This is a web application developed for the purpose od learning on Web technologies course. 

### About application

The application has a responsive design:

<p float="left">
  <img src="respo1.PNG" alt="respo1" width="400"/> 
  <img src="respo2.PNG" alt="respo2" width="300"/> 
  <img src="respo3.PNG" alt="respo3" width="250"/> 
</p>  

The timetable and its activities can be created by calling JavaScript functions. There are numerous checks that don't allow for more than one activity to be happening at a time. The examples of results of these calls are shown in the picture below:   

<img src="timetable.PNG" alt="timetable" width="700"/> 

The activities an subjects can be added using a form shown below. There are separate routes for CRUD operations that can store this data in CSV files or MySQL database. The routes were implemented using Express.js. 
 
<img src="activityform.PNG" alt="activityform" width="700"/>  

There is also a form for adding any number of students at once and putting them into groups, that does numerous checks on input before saving.

AJAX was used for all server requests.

Chai & Mocha were used for testing JavaScript functions and backend. Test cases for backend testing are storend in a CSV file.  

### Technology stack:
* JavaScript
  * Node.js
    * Express.js
    * Sequelize
    * Chai & Mocha
* HTML & CSS
* MySQL
* AJAX

 
