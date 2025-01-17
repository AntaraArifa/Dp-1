import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import "./App.css";

// Job Seeker Components
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import { Profile } from "./components/Profile";
import JobDescription from "./components/JobDescription";
import ChatPage from "./components/ChatPage";

// Admin Components
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";

// Resume Builder Components
import ResumeEditor from "./components/ResumeEditor";
import TemplateSelector from "./components/TemplateSelector";
import TemplatePreview from "./components/TemplatePreview";

// Dynamic Template Preview Component
const DynamicTemplatePreview = () => {
  const { templateId, resumeId } = useParams(); // Access dynamic params from the URL
  return <TemplatePreview selectedTemplate={templateId} resumeId={resumeId} />;
};

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/job-description/:jobId",
    element: <JobDescription />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate />,
  },
  {
    path: "/admin/companies/setup/:companyId",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/post",
    element: <PostJob />,
  },
  {
    path: "/admin/applicants",
    element: <Applicants />,
  },
  {
    path: "/resume/edit",
    element: <ResumeEditor />,
  },
  {
    path: "/resume/templates",
    element: <TemplateSelector />, // Replace with the appropriate component
  },
  {
    path: "/resume-builder/template-preview/:templateId/:resumeId",
    element: <DynamicTemplatePreview />,
  },
]);

// Main App Component
export default function App() {
  return <RouterProvider router={router} />;
}
