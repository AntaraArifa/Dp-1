# SmartHire Job Portal

## 🚀 Project Overview

**SmartHire** is a comprehensive job portal application that allows users to:
- Apply for jobs
- Build and manage **AI-powered resumes**
- Track job applications
- Connect with other users via real-time chat
- Prepare for interviews using built-in skill assessment tools

The application features a modern and responsive interface for seamless use across all devices.

---

## 🛠️ Technologies Used

- **Frontend**: React.js (Vite), Tailwind CSS  
- **Backend**: Node.js (Express.js)  
- **Database**: MongoDB  

---

## 🌟 Key Features

### 1. Job Application Management
- Browse job listings, apply to jobs, and track application status
- Employers can post and manage job listings

### 2. ✨ AI-Powered Resume Builder
- Users can input resume data or use AI assistance to generate professional content
- AI helps generate optimized bullet points, skill descriptions, and summaries
- Edit content manually or regenerate sections
- Choose from multiple templates and export as PDF

### 3. 💬 Community Chat
- Real-time messaging using WebSockets
- Enables professional networking and discussions among users

### 4. 🧠 Skill Assessment Tools
- Mock tests and interview prep modules
- Helps users evaluate and improve their job readiness

### 5. 🎨 Modern UI/UX
- Built with Tailwind CSS for a clean, responsive design
- Fast rendering and optimized performance using Vite + React

---

## 📁 Project Structure

project-directory/
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── admin/
│ │ │ ├── auth/
│ │ │ ├── shared/
│ │ │ ├── templates/
│ │ │ ├── ui/
│ │ ├── App.jsx
│ │ ├── index.jsx
│ ├── package.json
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middlewares/
│ ├── utils/
│ ├── index.js
│ ├── package.json

yaml
Copy
Edit

---

## 🧩 Frontend Components

### `ResumeEditor.jsx`
AI-integrated resume editor that allows:
- Manual or prompt-based input
- AI-generated summaries, bullet points, and skills
- Full editing control before finalizing resume content

### `TemplateSelector.jsx`
- Preview and select resume templates
- Export resumes as professional PDFs using `@react-pdf/renderer`

### `Jobs.jsx` & `Job.jsx`
- Display all job listings with filters
- View individual job postings and apply

### `Chat.jsx`
- Real-time chat for users
- Supports community discussions and direct messaging

---

## 🧪 Installation & Setup

1. **Clone the Repository**
```bash
git clone https://github.com/AntaraArifa/Dp-1.git
Navigate to the Project Directory

bash
Copy
Edit
cd Dp-1
Install Frontend Dependencies

bash
Copy
Edit
cd frontend
npm install
Install Backend Dependencies

bash
Copy
Edit
cd ../backend
npm install
Start the Application

bash
Copy
Edit
# In frontend/
npm run dev

# In backend/
node index.js
