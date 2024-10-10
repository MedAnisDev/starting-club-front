import { Form, Input, Button, Typography, notification } from 'antd';
import { useState  , useEffect} from 'react';
import { useNavigate } from 'react-router';
import React from 'react';
import { loginService } from '../../service/auth/Auth';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../redux/actions';
import './auth.css';



const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleDataChange = (event) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleLoginClick = (data) => {
        console.log('login Data:', data);
        loginService(data).then((response) => {
            console.log('API Response:', response);
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.userDTO));
            notification.success({
                message: "Login Successful",
                duration: 1.5,
              });
            dispatch(AuthAction.login({
                user : response.userDTO ,
                token : response.accessToken ,
                refreshToken : response.refreshToken 
            }));
            navigate('/home');
        })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSignUpClick = () => {
        navigate("/signup");
    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <Form method='POST' name='login-from' className='login-from' onFinish={handleLoginClick}>
                    <Typography.Title className='auth-title'>Login</Typography.Title>

                    <label>Email :</label>
                    <Form.Item
                        className='email'
                        name='email'
                        rules={[
                            { required: true, message: 'Ce champs est obligatoire' },
                            { type: 'email', message: 'veuillez entre un email valide' }
                        ]}
                    >
                        <Input name="email" value={loginData.email} onChange={(e) => handleDataChange(e)} />
                    </Form.Item>

                    <label>Password :</label>
                    <Form.Item
                        className='password'
                        name='password'
                        rules={[
                            { required: true, message: 'Ce champ est obligatoire' }
                        ]}
                    >
                        <Input.Password name='password'  value={loginData.password} onChange={(e) => handleDataChange(e)} />
                    </Form.Item>
                    <div className='button-container'>
                        <Button name='submit' type='primary' className='submit-btn' htmlType='submit' style={{ marginRight: '10px' } } >Login</Button>
                        <Button type="primary"  className='submit-btn' onClick={handleSignUpClick}>SignUp</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;