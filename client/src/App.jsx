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
import TaskLedgerLayout from "./layout/TaskLedgerLayout";
import TaskEdit from "./layout/TaskEdit";
import TaskAdd from "./layout/TaskAdd";

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
      path: "/dashCompTaskLedger",
      element: (
        <ProtectedRoute>
          <TaskLedgerLayout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashCompTaskEditSection/:id",
      element: (
        <ProtectedRoute>
          <TaskEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashCompTaskAddSection",
      element: (
        <ProtectedRoute>
          <TaskAdd />
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
