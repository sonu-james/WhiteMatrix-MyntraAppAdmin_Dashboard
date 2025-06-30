import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const navigate = useNavigate()
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""

    })
    // console.log(loginDetails);
    const handleLogin = () => {
        const { email, password } = loginDetails;
        if (email === 'admin@example.com' && password === 'admin123') {
            sessionStorage.setItem('emailData', email);
            sessionStorage.setItem('passwordData', password);
            toast.success('Login successful');
            navigate('/dashboard');
        }
        // …
    };

    return (
        <>

            <div className=' container-fluid d-flex align-items-center justify-content-center login ' style={{ height: '100vh' }}>
                <div className='container  p-3  rounded shadow loginmain' >
                    <Row>
                        <Col sm={12} md={6} className='d-flex align-items-center justify-content-center '>
                            <img src="https://i.pinimg.com/originals/94/09/7e/94097e458fbb22184941be57aaab2c8f.png" alt="no image" className='w-100' />

                        </Col>
                        <Col sm={12} md={6} className='d-flex align-items-center justify-content-center text-center flex-column text-light'>
                            <h3 className='text-primary'>
                                <FontAwesomeIcon icon={faUserTie} beatFade style={{ color: "#00008b", }} className='me-3 mt-5' />Admin</h3>

                            <h6 style={{ color: "#ff0019" }}>Login in to your Account</h6>
                            <form className=' w-75 align-items-center justify-content-center rounded p-4'  >

                                <div className='mb-3'>
                                    <input type="email" placeholder='Email' className='form-control w-100' style={{ height: "40px" }} onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} />
                                </div>
                                <div className='mb-3'>
                                    <input type="password" placeholder='Password' className='form-control w-100' style={{ height: "40px" }} onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} />
                                </div>

                                <div className='mt-4'>
                                    <div>
                                        <button type="button" className='btn btn-primary   w-100 mb-2 ' onClick={handleLogin}>Login</button>

                                    </div>
                                </div>
                            </form>

                        </Col>
                    </Row>
                </div>

            </div>
            <ToastContainer position='top-center' theme='colored' />
        </>
    )
}

export default Login