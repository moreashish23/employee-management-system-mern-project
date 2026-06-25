import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import LoginPage       from "../pages/auth/LoginPage";
import RegisterPage    from "../pages/auth/RegisterPage";
import DashboardPage   from "../pages/dashboard/DashboardPage";
import EmployeeListPage from "../pages/employees/EmployeeListPage";
import AddEmployeePage  from "../pages/employees/AddEmployeePage";
import EditEmployeePage from "../pages/employees/EditEmployeePage";
import EmployeeDetailPage from "../pages/employees/EmployeeDetailPage";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard"           element={<DashboardPage />} />
            <Route path="/employees"           element={<EmployeeListPage />} />
            <Route path="/employees/add"       element={<AddEmployeePage />} />
            <Route path="/employees/:id"       element={<EmployeeDetailPage />} />
            <Route path="/employees/:id/edit"  element={<EditEmployeePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}