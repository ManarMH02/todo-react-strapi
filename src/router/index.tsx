import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/LogIn";
import RegisterPage from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ProfilePage from "../pages/Profile";
import ErrorHandler from "../components/errors/ErrorHandler";
import TodosPage from "../pages/Todos";

const storageKey = 'loggedInUser'
const userDataString = localStorage.getItem(storageKey)
const userData = userDataString ? JSON.parse(userDataString) : null

const router = createBrowserRouter(
    createRoutesFromElements(
        // root Layout 
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler/>}>

            <Route index element={
                <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
                    <HomePage />
                </ProtectedRoute>
            } />

            <Route path="profile" element={
                <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
                    <ProfilePage />
                </ProtectedRoute>
            } />

            <Route path="todos" element={
                <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
                    <TodosPage />
                </ProtectedRoute>
            } />

            <Route path="login" element={
                <ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/" data={userData}>
                    <LoginPage />
                </ProtectedRoute>
            } />

            <Route path="register" element={
                <ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/login" data={userData}>
                    <RegisterPage />
                </ProtectedRoute>
            } />
        </Route>
    )
)


export default router