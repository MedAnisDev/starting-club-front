import React  from "react";
import { Button, notification } from 'antd';
import { useNavigate , Link} from 'react-router-dom';
import { useSelector , useDispatch } from "react-redux";

import { AuthAction } from '../../redux/actions';
import { logoutService } from '../../service/auth/Auth';
import { InfoCircleOutlined } from "@ant-design/icons";
import { Starting } from "../../assets/index.js";

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

    try{
      logoutService(token);      
      notification.info({
        message: "Logout Successful",
        description: "You have been successfully logged out.",
        placement: "topRight",
        duration: 5, // Reduced the duration to 5 seconds (adjust as necessary)
        style: {
          width: 300,
          borderRadius: "10px",
        },
      });
      //clearing localStorage
      localStorage.removeItem('user');
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      
      dispatch(AuthAction.logout());
      navigate('/');
    }catch(err) {
      console.log(err);
    };
  };

  const onLogoClick =()=> {
    navigate('/home')
  }

  

  return (
    <div className="header">
      {/**<img src={Starting} width="200px" height="100px"  onClick={()=>onLogoClick()}/> */}
      <h2 className="header-left"> Starting Club</h2>
      
      
      <div className="header-right">
        <nav>
          <ul>
            {!isAuthenticated ? (
              <li><Link className='navlinks' to='/home'>Home</Link></li>
            ) : (
              <>
                <li><Link className='navlinks' to='/home'>Home</Link></li>
                <li><Link className='navlinks' to='/about'>À Propos</Link></li>
                <li><Link className='navlinks' to='/president-message'>Mot du Président</Link></li>
                <li><Link className='navlinks' to='/athletes'>Athlètes</Link></li>
                <li><Link className='navlinks' to='/news'>Actualité</Link></li>
                <li><Link className='navlinks' to='/events'>Événements</Link></li>
                <li><Link className='navlinks' to='/gallery'>Galerie</Link></li>
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
