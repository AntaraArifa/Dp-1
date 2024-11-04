<<<<<<< HEAD
import { useState } from "react";
import "./App.css";
import Navbar from "./components/shared/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const appRouter = createBrowserRouter([
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
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
>>>>>>> efb4e6f (Niaz 2nd commit)
    </>
  );
}

export default App;
