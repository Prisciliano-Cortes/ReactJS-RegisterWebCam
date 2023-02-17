import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export const PrivateLayout = () => {
    const { user } = useUserContext();

    return user ? <Outlet /> : <Navigate to="/certificate" />;
};