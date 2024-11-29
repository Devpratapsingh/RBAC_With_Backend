# RBAC Management System (Full-Stack)
#### This is a Role-Based Access Control (RBAC) management system built using React.js for the frontend and Express.js for the backend. The system distinguishes between user and admin roles, providing functionalities to manage users and their roles effectively. The backend uses JWT for authentication, bcrypt for password hashing, and MongoDB for data storage.

## Features
### User Features:
#### Sign Up & Log In: Users can create an account and log in.
#### View Profile: After logging in, users can view their profile, including their name, email, and role.
#### Access Control: Users can access limited functionalities based on their assigned roles (e.g., admin has more privileges).
### Admin Features:
#### User Management: Admins can view all users and perform CRUD operations on user data.
#### Role Management: Admins can modify roles and statuses (Active/Inactive) of users.
## Tech Stack
### Frontend:
#### React.js: Component-based UI development.
#### React Router DOM: For routing and navigation.
#### Tailwind CSS: For responsive, clean, and modern styling.
#### Axios: For making HTTP requests to the backend.
## Backend:
#### Express.js: Web framework for building the RESTful API.
#### MongoDB: NoSQL database to store user data.
#### Mongoose: ORM to interact with MongoDB.
#### JWT (JSON Web Tokens): For authentication and authorization.
#### bcryptjs: For password hashing and security.
### Installation
#### npm install --> node modules 
#### npm install react-router-dom --> reacter routers
#### npm install nodemon
#### npm install mongoose ---> Database
#### npm install bcrypt
#### npm install jsonwebtoken
#### npm install body-parser
#### npm install cors
#### npm install uuid
#### npm install dotenv
#### npm install axios
#### npm install react-icons
#### npm install react-redux
#### npm install @reduxjs/toolkit

## How to Run 
### starting Server
#### npm start
### starting frontend
#### npm run dev
