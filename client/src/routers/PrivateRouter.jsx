import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRouter(props) {
   

    if (true) {
        return <Outlet />
    };
    return <Navigate to="/login" replace />;
}
