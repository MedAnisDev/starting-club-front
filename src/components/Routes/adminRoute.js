import { useSelector } from "react-redux";

const AdminRoute = ({children}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated) ;
    const userRole = useSelector((state) => state.auth.user?.role?.name) ;
    if(isAuthenticated && (userRole === "ROLE_SUPER_ADMIN" || userRole === "ROLE_ADMIN")){
        return children ;
    }
};

export default AdminRoute ;