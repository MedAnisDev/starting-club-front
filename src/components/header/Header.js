import React  from "react";
import { Button, notification } from 'antd';
import { useNavigate , Link} from 'react-router-dom';
import { useSelector , useDispatch } from "react-redux";

import { AuthAction } from '../../redux/actions';
import { logoutService } from '../../service/auth/Auth';
import "./Header.css";

function Header() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated) ;
  const userRole = useSelector(state => state.auth.user?.role?.name) ;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('./login');
  };


  const handleLogoutClick = () => {
    
    // back-end request
    const token  =localStorage.getItem('token');

    logoutService(token).then((resp)=> {
      console.log("backend response -> ",resp.message);
      
      notification.info(resp.message)
    })
    .catch((err) => {
      console.log(err);
    }) ;
   

    //clearing localStorage
    localStorage.removeItem('user');
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(AuthAction.logout());

    navigate('/');
  };

  

  return (
    <div className="header">
      <h2 className="header-left"> Club d'Athlétisme</h2>
      
      
      <div className="header-right">
        <nav>
          <ul>
            {!isAuthenticated ? (
              <li><Link className='navlinks' to='/'>Home</Link></li>
            ) : (
              <>
                <li><Link className='navlinks' to='/about'>À Propos</Link></li>
                <li><Link className='navlinks' to='/president-message'>Mot du Président</Link></li>
                <li><Link className='navlinks' to='/athletes'>Athlètes</Link></li>
                <li><Link className='navlinks' to='/news'>Actualité</Link></li>
                <li><Link className='navlinks' to='/events'>Événements</Link></li>
                <li><Link className='navlinks' to='/gallery'>Galerie</Link></li>
                <li><Link className='navlinks' to='/membership'>Adhésion</Link></li>
                <li><Link className='navlinks' to='/blog'>Blog</Link></li>
                {(userRole === "ROLE_SUPER_ADMIN" || userRole === "ROLE_ADMIN") && (
                  <li><Link className='navlinks' to='/dashboard/*'>Admin Dashboard</Link></li>
                )}
              </>
            )}
          </ul>
        </nav> 
        
        <Button className="btn-login" type="primary" onClick={isAuthenticated ? handleLogoutClick : handleLoginClick }>{isAuthenticated ?"Logout" : "Login"}</Button>

      </div>
    </div>
  );
}

export default Header;
