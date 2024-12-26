# Social Networking

## Project Description

The **Social Networking** project is an online platform designed to make social life more active and engaging. This social networking site enables users to maintain existing relationships, share messages, and establish new connections with others in the community. It offers robust functionality for user interaction, content sharing, and relationship building.

## Technologies Used

* **Java** - version 17+
* **Spring Boot** - Version 3.4 (Spring Security, Spring Web, Spring Data)
* **JUnit** - Unit testing framework
* **Mockito** - Mocking for unit testing
* **MySQL** - Database management
* **React** - Version 18.0 (React Router DOM, React features)
* **MUI** - Material-UI for responsive styling

## Features

### Implemented Features:
* User registration and authentication with Spring Security
* Secure user login functionality
* User profile creation and management
* Connect with other users (follow/friend system)
* Post content including text, images, and videos
* Comment on posts
* Like/react to posts
* Search functionality for users, posts, and content

### To-Do List:
* Media
* Optimize search with filters and sorting
* reactions and replies to comments
* Add real-time notifications for user interactions
* Enable post-sharing functionality

## Getting Started

Clone the repository using the following command:  
```bash
git clone https://github.com/michaelcao512/SocialNetwork.git
```

### Setup Instructions

##### Backend Setup:
1. Install Java (JDK 17 or higher).
2. Install and set up a SQL database
3. Configure database settings in `application properties` in the socialmedia folder under the src folder
4. Navigate to the backend directory and build the project
   mac
   ```bash
   cd  backend
   ./mvnw clean install
   ```
   windows
   ```bash
   cd  backend
   .\mvnw clean install
   ```
6. Run the backend server:
   mac
   ```bash
   ./mvnw spring-boot:run
   ```
   windows
   ```bash
   .\mvnw spring-boot:run
   ```
##### Frontend Setup:
1. Install Node.js (version 16 or higher).
2. Navigate to the frontend directory and install dependencies
   ```bash
   cd frontend
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run start
   ```

## Usage
1. Access the application through http://localhost:3000 after inital frontend / backend setup
2. Register a new account or log in with existing credientals
3. Explore
  * Edit your profiile
  * Create posts
  * Interact with other profiles and posts

## License
This project uses the following license: MIT license

   
