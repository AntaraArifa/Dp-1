import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import TemplatePreview from "./components/TemplatePreview"; // TemplatePreview is the unified preview component

// Hook to fetch resume data
import { useGetResumeData } from "./hooks/useGetResumeData";

// Dynamic Template Preview Component
const DynamicTemplatePreview = () => {
  const { data, error } = useGetResumeData();

  if (error) {
    return <h1 className="text-center text-red-600">Error Loading Resume Data</h1>;
  }

  if (!data) {
    return <h1 className="text-center text-blue-600">Loading...</h1>;
  }

  return <TemplatePreview selectedTemplate="modern" resumeData={data} />;
};

const appRouter = createBrowserRouter([
  // Job Seeker Routes
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/chat", element: <ChatPage /> },

  // Admin Routes
  { path: "/admin/companies", element: <Companies /> },
  { path: "/admin/companies/create", element: <CompanyCreate /> },
  { path: "/admin/companies/:id", element: <CompanySetup /> },
  { path: "/admin/jobs", element: <AdminJobs /> },
  { path: "/admin/jobs/create", element: <PostJob /> },
  { path: "/admin/jobs/:id/applicants", element: <Applicants /> },

  // Resume Builder Routes
  { path: "/resume/edit", element: <ResumeEditor /> },
  { path: "/resume/templates", element: <TemplateSelector /> },
  {
    path: "/resume/templates/:id",
    element: <DynamicTemplatePreview />, // Dynamically render template previews
  },
  { path: "/resume/preview", element: <TemplatePreview selectedTemplate="modern" /> }, // Unified component for preview

  // Fallback Route for 404
  { path: "*", element: <h1 className="text-center text-red-600">404 - Page Not Found</h1> },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
