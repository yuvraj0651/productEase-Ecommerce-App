import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles = [] }) => {
    const authData = useSelector((state) => state.auth.authData);
    console.log("Protected Route:", authData);
    const isAuthenticated = !!authData;

    if (!isAuthenticated) {
        return <Navigate to="/account" replace />;
    };

    if (allowedRoles.length > 0 && !allowedRoles.includes(authData.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children;
};

export default ProtectedRoutes;
