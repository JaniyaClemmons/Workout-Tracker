# Workout Tracker

## Overview
![workout-create-ezgif com-optimize](https://github.com/user-attachments/assets/4fc0925e-f8f2-43b6-bf8c-0cfac4acc9e8)

![add_exercise-ezgif com-optimize](https://github.com/user-attachments/assets/d2333ca9-4336-4351-8654-8aa491b82e28)


This is a full-stack workout tracker application built with the MERN stack. It allows users to log in to a personalized dashboard, create and manage their workouts, and schedule exercises on a calendar.

## Features

- User Authentication: Register and login to access a personalized workout dashboard.
- Exercise Management: Create and delete exercises and workouts stored in your personal library.
- Workout Scheduling: Schedule workouts for specific days on an interactive calendar.
- Progress Tracking: View and manage your workout history.

## Technologies Used

- Frontend: React.js, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens), bcrypt.js
- Styling: CSS, Bootstrap

## Installation

### Prerequisites

- Node.js and npm (Node Package Manager) installed.
- MongoDB server running or a MongoDB Atlas account.

### Clone the Repository

```bash
git clone https://github.com/JaniyaClemmons/Workout-Tracker.git
cd Workout-Tracker
```

### Backend Setup

1. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add the following environment variables:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
    Note: You'll need your own MongoDB URI. You can set up a free MongoDB Atlas account or use a local MongoDB server. For security reasons, you should also generate a unique JWT_SECRET.

4. Start the server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

The application should now be running on `http://localhost:3000`.

## Usage

1. User Registration and Login: Create an account or log in to access the dashboard.
2. Create Workouts: Add exercises to your library, create custom workouts, and delete them if necessary.
3. Schedule Workouts: Plan your workout routine by scheduling workouts on the calendar.
4. Track Progress: View workout history and monitor your fitness journey.

## Contributing

If you would like to contribute to this project:

1. Fork the repository.
2. Create a new branch:

    ```bash
    git checkout -b feature/your-feature
    ```

3. Make your changes and commit them:

    ```bash
    git add .
    git commit -m "Add feature"
    ```

4. Push to the branch:

    ```bash
    git push origin feature/your-feature
    ```

5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspiration for this project came from my own need to track my workouts as a professional basketball player.
- Thanks to the open-source community for providing tools and libraries that made development easier.
