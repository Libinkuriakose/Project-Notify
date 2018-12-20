# Notify-Dct-project
# Overview
This project enables the user to create departments, add employees to that department, create groups, customize the calendar by marking the events automatically. Also, user can chat with everybody using global chat, add posts and comments. The code in this repository covers back end as well as front end part of this project.
# Dependencies and installation
1. cors `npm i cors`
2. express `npm i express`
3. mongoose  `npm i mongoose`
4. nodemon `npm i nodemon`
5. socket.io `npm i socket.io`
6. strftime `npm i strfttime`
7. axios `npm install --save axios`
8. bootstrap `npm i bootstrap`
9. react `create-react-app`
10. react-big-calendar `npm i react-big-calendar`
11. react-dom `npm i react-dom`
12. react-router-dom `npm react-router-dom`
13. react-scripts `npm i react-scripts`
14. reactstrap `npm i reactstrap`
15. socket.io-client `npm i socket.io-client`
16. strftime `npm i strftime`
# Usage
# `Back-end`
 ## `create, edit, view and delete Departments`
- get '/departments'
  - See the list of departments.
- get '/departments/:id'
  - View the details of a particular department, its members, events conducted by that department etc.
- put '/departments/:id'
  - Change the description, name, remove/add members.
- delete '/departments/:id'
  - Delete the department
- get 'departments/posts/:id' 
  - find the posts belonging to a department
 ## `create, edit, view and delete Groups`
- get '/groups'
  - See the list of groups.
- get '/groups/:id'
  - View the details of a particular group, its members, events conducted by that group etc.
- put '/groups/:id'
  - Change the description, privacy, name, remove/add members.
- delete '/groups/:id'
  - Delete the group
- get 'groups/posts/:id' 
  - find the posts belonging to a group
## `create, edit, view and delete Employees`
- get '/employees'
  - See the list of employees, to see more about each employee click on the profile.
- post '/employees'
  - Create an employee with the required details.
- put '/employees'
  - Change the details and update.
- get '/employees/:id'
  - View the profile, see the calendar, chat globally
- delete
  - Delete account.
## `create, edit, view and delete Activity`
- get '/activities'
  - See the list of activities
- post '/activities'
  - Create a new activity/event, add/invite participants, add the details such as venue, date and time and guests.
- put '/activities/:id'
  - Change the details and update.
- delete '/activities/:id'
  - Delete the activity and remove the same form departments and employees who would have been added to it.
  
# FrontEnd  
  
## `create, edit and delete Department`
- Department
  - See the list of departments, to see more about each department click on visit this department.
- Add Department
  - Create a new department, write descriptions about it, add members.
- Edit Department
  - Change the description, name, remove/add members.
- departmentDetails
  - View the details of a particular department, its members, events conducted by that department etc.
- Delete 
  - Delete the department
## `create, edit and delete Groups`
- Groups
  - See the list of Groups, to see more about each groups click on 'more' near the group.
- Create Group
  - Create a new group, write descriptions about it, add members,set privacy.
- Edit Group
  - Change the description,privacy, name, remove/add members.
- Group Details
  - View the details of a particular group, its members, events participated or conducted by that group etc.
- Delete 
  - Delete the group specified
## `create, edit and delete Employees`
- Employee
  - See the list of employees, to see more about each employee click on the profile.
- Add Employee
  - Create an employee with the required details.
- Edit Employee
  - Change the details and update.
- Employee details
  - View the profile, see the calendar, chat globally
- Delete
  - Delete account
## `create, update and delete Activity`
- Activity
  - See the list of activities
- Add Activity
  - Create a new activity/event, add/invite participants, add the details such as venue, date and time and guests.
- editActivity
  - Change the details and update.
- Delete
  - Delete the activity and remove the same form departments and employees who would have been added to it.
## `add Post`
- post '/posts'
  - When creating a post ,the component in the frontend can be reused where ever the posting is required. Comments and applause
    buttons get attached to it automatically whenever new post is created.
# Authors
1. Shreekar Hegde
2. Libin Kuriakose
 

