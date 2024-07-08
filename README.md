
# Fullstack Exam Portal (MERN)



# Overview
AssessPro Exam Portal is a web-based examination system designed to simplify the process of creating, administering, and grading exams. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), this platform provides a user-friendly interface for educators to efficiently create and manage exams, while offering a seamless experience for students to take exams online. The application caters to both administrators and users, offering comprehensive features to enhance the online examination process, improve assessment outcomes, and reduce administrative burdens.



### Why/Problem?
Manual systems and paper-based exams can lead to inefficient use of resources, inaccurate results, limited accessibility, poor student experience, and insufficient insights.



### **Background**:

The Online Exam Portal addresses the need by harnessing the power of MERN stack ensures scalability, while the integration of Redux Toolkit, Headless UI, and Tailwind CSS enhances user experience and performance, the portal ensures secure, and reliable environment for educators to create, administer, and grade exams, ultimately enhancing the overall learning experience.

### 
## **Admin Features:**
1. **User Management:**
    - Add and manage users(teachers and students).

2. **Add Subjects:**
    - Assign subjects available for tests.
    - Update subject details and status.
3. **User Account Control:**
    - Disable or activate user accounts.


## **User Features:**
1. **Teacher:**
    - Create Tests and assign questions and duration.
    - View detailed test information such as rank-list and score of students in particular test.
    - Add Questions to database, update questions and status.
    - Platform enables use of AI to create high-quality, diverse, and relevant questions
    - `email - demoteacher@mail.com and password - 123456`

2. **Student:**
    - Register for tests and get upcoming exams list in tabular form.
    - Allows students to navigate through exams with ease, with clear instructions, timers, and instant feedback on their performance. 
   - Get detailed report of completed test along with explanation and correct and marked answers.
   -  `email - demostudent@mail.com and password - 123456`


## **General Features:**
1. **Authentication and Authorization:**
    - User login with secure authentication.
    - Role-based access control.

2. **Password Management:**
    - Change passwords securely.

4. **Dashboard:**
    - Provide a summary of activities based on role.




## **Technologies Used:**
- **Frontend:**
    - React (Vite)
    - Redux Toolkit for State Management
    - Headless UI
    - Tailwind CSS


- **Backend:**
    - Node.js 
    - Express.js
    - Passport.js for authentication Middlewares
    
- **Database:**
    - MongoDB



## SETUP INSTRUCTIONS


# Server Setup

## Environment variables
The `config` file contains the following environment variables:

- mongodb.connectionString = `your MongoDB URL`
- jwt.secret = `any secret key - must be secured`
- PORT = `3000` or any port number


&nbsp;

## Set Up MongoDB:

1. Setting up MongoDB involves a few steps:
    - Visit MongoDB Atlas Website
        - Go to the MongoDB Atlas website: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

    - Create an Account
    - Log in to your MongoDB Atlas account.
    - Create a New Cluster
    - Choose a Cloud Provider and Region
    - Configure Cluster Settings
    - Create Cluster
    - Wait for Cluster to Deploy
    - Create Database User
    - Set Up IP Whitelist
    - Connect to Cluster
    - Configure Your Application
    - Test the Connection

2. Create a new database and configure the `config` file with the MongoDB connection URL. 

## Steps to run server

1. Open the project in any editor of choice.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm start` to start the server.
4. Add Frontend Url in corsOptions in app.js

If configured correctly, you should see a message indicating that the server is running successfully on port 3000 locally and add admin to database created.

Note : admin user is created when backend runs first time. default admin (username, password) details in addAdminIfNotFound() function of backend/services/admin.js file  is for this logic. You can check/modify default admin details from this function.
&nbsp;
# Client Side Setup
## Steps to run client

1. Navigate into the client directory `cd client`.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm start` to run the app on `http://localhost:3001`.
4. Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

&nbsp;

## List of planned features:
   - User authentication with Google OAuth
- Charts to show details of score in test
- More filtering options

## Screenshots:
Login Form:
![Login Form](https://github.com/anshuman1222/AssessProPortal/assets/100074643/da7f31bd-8424-4ec2-8a86-ef641fa47b98)
Exams Listed:
![Exams Listed](https://github.com/anshuman1222/AssessProPortal/assets/100074643/4ba57e37-c0c6-4828-8b75-4834107c9ed4)
Add Question:
![Add Question](https://github.com/anshuman1222/AssessProPortal/assets/100074643/0c1808a1-e0bc-4e02-8cc7-cdbc6940a6af)
Todo Exams:
![Todo Exams](https://github.com/anshuman1222/AssessProPortal/assets/100074643/5724d8e0-16dc-400f-909f-ab520db8ce71)
Take Test Page:
![Test Page](https://github.com/anshuman1222/AssessProPortal/assets/100074643/481ef3e4-0d31-4787-82bc-769567dc483c)
Results:
![Results](https://github.com/anshuman1222/AssessProPortal/assets/100074643/982b22f3-d57f-47e8-9ba4-f73a5716f38d)

## For Support, Contact:

- Email: anshumanbehera9999@gmail.com
