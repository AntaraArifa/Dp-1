# SmsrtHire Job Portal

## Project Overview

SmsrtHire is a comprehensive job portal application that allows users to:
- Apply for jobs.
- Build and manage resumes.
- Manage job applications.
- Connect with other users through real-time communication.
- Prepare for interviews with integrated skill assessment tools.

The application is designed with a modern and responsive interface, ensuring seamless functionality across devices.

### Technologies Used
- **Frontend**: React.js (with Vite), Tailwind CSS
- **Backend**: Node.js (Express.js)
- **Database**: MongoDB

---

## Features

### 1. Job Application Management
- Users can browse job postings, apply for positions, and track their applications.
- Employers can post jobs and manage applicants.

### 2. Resume Builder
- Users can build resumes with a user-friendly editor.
- Provides dynamic sections for personal details, education, experience, and skills.
- Resumes can be exported as PDFs using various professional templates.

### 3. Community Chat Feature
- Enables real-time communication among users.
- Designed to facilitate networking and community discussions.

### 4. Skill Assessment Module
- Provides mock tests and interview preparation tools.
- Helps users assess their skills and improve their job readiness.

### 5. Modern User Interface
- Styled with Tailwind CSS for a clean, responsive, and modern design.
- Built with React and Vite for fast rendering and improved performance.

### 6. Secure and Scalable Backend
- RESTful APIs built with Node.js and Express.js.
- Implements user authentication and role-based access control.
- MongoDB ensures scalable and reliable data storage.

---

## Project Structure

project-directory/ ├── frontend/ │ ├── public/ │ ├── src/ │ │ ├── assets/ │ │ ├── components/ │ │ │ ├── admin/ │ │ │ ├── auth/ │ │ │ ├── shared/ │ │ │ ├── templates/ │ │ │ ├── ui/ │ │ ├── App.jsx │ │ ├── index.jsx │ ├── package.json ├── backend/ │ ├── routes/ │ ├── controllers/ │ ├── models/ │ ├── middlewares/ │ ├── utils/ │ ├── index.js │ ├── package.json

## Frontend Details

### Key Components

#### 1. Resume Editor
- **File**: `ResumeEditor.jsx`
- **Description**: 
  Allows users to enter details like personal information, education, experience, and skills. Saves resume data and provides a seamless transition to template selection.

#### 2. Template Selector
- **File**: `TemplateSelector.jsx`
- **Description**: 
  Displays multiple resume templates and allows users to preview and download resumes in PDF format using `@react-pdf/renderer`.

#### 3. Job Listings
- **Files**: 
  - `Job.jsx` (Individual job postings)
  - `Jobs.jsx` (List of all jobs)
- **Description**: 
  Displays jobs with filtering and sorting options.

#### 4. Chat Module
- **Files**: 
  - `Chat.jsx`
- **Description**: 
  Enables real-time communication using WebSockets.

#### Styling
- Tailwind CSS is used throughout the frontend for styling, ensuring a responsive and clean design.

---

## Backend Details

### API Endpoints

#### User Routes
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/api/v1/user/register` | Register a new user         |
| POST   | `/api/v1/user/login`    | Login a user and return JWT |
| GET    | `/api/v1/user/profile`  | Get user profile            |

#### Job Routes
| Method | Endpoint        | Description             |
|--------|-----------------|-------------------------|
| GET    | `/api/v1/jobs`  | Fetch all job postings  |
| POST   | `/api/v1/jobs`  | Create a new job post   |
| PUT    | `/api/v1/jobs/:id` | Update a job posting   |
| DELETE | `/api/v1/jobs/:id` | Delete a job posting   |

#### Resume Routes
| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| GET    | `/api/v1/resume`    | Fetch all resumes for a user |
| POST   | `/api/v1/resume`    | Create a new resume          |
| PUT    | `/api/v1/resume/:id` | Update a specific resume     |
| DELETE | `/api/v1/resume/:id` | Delete a specific resume     |

### Database Models

#### User Model
- Stores user information and roles (e.g., job seeker, employer).
- **Key Fields**:
  - Name
  - Email
  - Password (hashed)
  - Role

#### Job Model
- Stores job postings.
- **Key Fields**:
  - Title
  - Description
  - Company
  - Requirements
  - Posted By (Employer ID)

#### Resume Model
- Stores resumes for users.
- **Key Fields**:
  - User ID (reference to User model)
  - Personal Info (name, email, phone, address)
  - Education
  - Experience
  - Skills

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AntaraArifa/Dp-1.git

