import { Outlet, Navigate } from 'react-router-dom';
import Header from "../components/Header"
export default function PrivateRouter(props) {
   

    if (true) {
        return <>
        <Header/>
        <Outlet /></>
    };
    return <Navigate to="/login" replace />;
}
