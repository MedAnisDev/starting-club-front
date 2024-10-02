import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if(!isAuthenticated){
    return <>{children}</>;
  }
  return null;
};

export default PublicRoute ;