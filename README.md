# Flywire Employee Directory Frontend

This is a React-based frontend application for managing and retrieving company employee information. The application interacts with a Spring Boot backend to fetch and display employee data. It allows users to view active employees, get employee details, add new employees, and deactivate employees.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI (MUI)**: A popular React UI framework for building responsive, modern web applications.
- **Axios**: A promise-based HTTP client for making requests to the backend API.
- **react-router-dom**: A library for routing in React applications.

## Features

- List all active employees in alphabetical order.
- View detailed information about an employee, including their direct hires.
- Add a new employee with validation.
- Deactivate an employee by their ID.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sirius829/flywire-frontend.git
    cd flywire-frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Application

1. **Start the development server:**

    ```bash
    npm start
    ```

    The application will start on `http://localhost:3000`.

### Environment Variables

Make sure to set the backend server URL in the `.env` file. Create a `.env` file in the root of the project and add the following:

    ```env
    REACT_APP_SERVER_IP=http://localhost:8080
    ```

### Usage

#### Home Page (Active Employees)

1. Navigate to `http://localhost:3000`.
2. The home page displays a list of all active employees in alphabetical order.
3. Click on an employee to view their detailed information.
4. Click on `deactive Icon` to deactivate the specific employee.

#### Active Employees by hired Range Page

1. Navigate to `http://localhost:3000/range`.
2. The page displays a list of all active employees hired in the selected date range in hired date order descending.
3. Click on an employee to view their detailed information.
4. Click on `deactive Icon` to deactivate the specific employee.

#### Employee Details Page

1. Click on an employee from the home page list.
2. You will be navigated to the employee details page showing the employee's position, hire date, and their direct hires.
3. Click on employee listed on direct hire, you will be navigated to his/her detail page.

#### Add Employee Popup

1. Navigate to `http://localhost:3000/` or click on the "New Employee" Button.
2. Fill in the employee details in the form.
3. Click the "Add Employee" button to submit.
4. If successful, popup will removed, and the new employee will be added to the list of active employees.

### Checking Pages

- **Home Page**: Displays the list of active employees.
- **Home Page**: Displays the list of active employees hired in the selected date range.
- **Employee Details Page**: Displays details of a selected employee.

### License

This project is licensed under the MIT License.
