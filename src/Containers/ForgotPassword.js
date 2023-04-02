import React, { Fragment, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import Header from '../Components/Header';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import './error.css';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const btnEle = document.getElementById("btn_reset");
        btnEle.disabled = true;
        try {
            const url = `https://urlshortener-backend-sj.onrender.com/api/auth/password-reset`;
            const { data } = await axios.post(url, { email });
            setMsg(data.message);
            setError("");
            btnEle.disabled = false;
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
                btnEle.disabled = false;
            }
        }
    };

    return (
        <Fragment>
            <Header />
            <Container className='center-content'>
                <ToastContainer />
                <Form className='login-form my-4' onSubmit={handleSubmit} style={{width: '90vw'}}>
                    <legend className='text-center primary-text'>
                        Forgot Password
                    </legend>
                    <hr />
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </Form.Group>
                    {error && <div className="error_msg">{error}</div>}
                    {msg && <div className="success_msg">{msg}</div>}
                    <Button variant='primary' id='btn_reset' type='submit'>
                        Reset Password
                    </Button>
                </Form>
            </Container>
        </Fragment>
    );
};

export default ForgotPassword;
