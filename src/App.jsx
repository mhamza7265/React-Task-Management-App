import "font-awesome/css/font-awesome.min.css";
import "./assets/css/app.css";
import ChangePasswordAuthLayout from "./hoc/ChangePasswordAuthLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginAuthLayout from "./hoc/LoginAuthLayout";
import ResetPasswordAuthLayout from "./hoc/ResetPasswordAuthLayout";
import PageNotFound from "./components/PageNotFound";
import UserPreferencesPage from "./pages/UserPreferencesPage";
import AddNewTask from "./components/AddNewTask";
import DashboardMain from "./pages/DashBoardMain";
import UserProfileLayout from "./hoc/userProfileLayout";
import DashDefault from "./pages/DashDefault";
import Dashboard from "./components/dashboard";
import RequireAuth from "./components/RequireAuth";
import EditTasks from "./components/EditTask";
import Users from "./components/Users";
import RegisterAuthLayout from "./hoc/RegisterAuthLayout";
import Container from "./Organiser/Container";
import OtpAuthLayout from "./hoc/OtpAuthLayout";
import HaveAuth from "./components/HaveAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <HaveAuth>
              <LoginAuthLayout />
            </HaveAuth>
          }
        />
        <Route
          exact
          path="/reset-password"
          element={<ResetPasswordAuthLayout />}
        />
        <Route
          exact
          path="/change-password"
          element={<ChangePasswordAuthLayout />}
        />

        <Route path="/otp" element={<OtpAuthLayout />} />

        <Route exact path="/register" element={<RegisterAuthLayout />} />

        <Route path="*" element={<PageNotFound />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <DashboardMain />
            </RequireAuth>
          }
        >
          <Route index element={<DashDefault />} />
          <Route path="tasks" element={<Dashboard />} />
          <Route path="profile" element={<UserProfileLayout />} />
          <Route path="profile/preferences" element={<UserPreferencesPage />} />
          <Route path="addnewtask" element={<AddNewTask />} />
          <Route path="edittask" element={<EditTasks />} />
          <Route path="users" element={<Users />} />
          <Route path="taskstat" element={<Container />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
