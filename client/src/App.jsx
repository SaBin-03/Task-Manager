import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./layout/LandingPage";
import PublicRoute from "./context/PublicRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";
import Verify from "./components/Verify";
import Dashboard from "./layout/Dashboard";
import ProtectedRoute from "./context/ProtectedRoute";
import DashComponent from "./pages/DashComponent";
import DashComponentTask from "./pages/DashComponentTask";
import AddDash from "./layout/AddDash";
import TaskLedgerLayout from "./layout/TaskLedgerLayout";

const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <Home />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    {
      path: "/verify-email",
      element: <VerifyEmail />,
    },
    {
      path: "/verify/:token",
      element: (
        <PublicRoute>
          <Verify />
        </PublicRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashCompTask",
      element: (
        <ProtectedRoute>
          <AddDash />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashCompTaskLedger",
      element: (
        <ProtectedRoute>
          <TaskLedgerLayout />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
