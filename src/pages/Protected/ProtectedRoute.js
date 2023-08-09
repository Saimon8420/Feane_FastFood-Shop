import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userData = useSelector((state) => state.auth.login);
    if (userData.length !== 0) {
        return children;
    }
    return <Navigate to='/login' replace />
};

export default ProtectedRoute;