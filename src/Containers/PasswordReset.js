import React, { Fragment, useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import './error.css';

const PasswordReset = () => {

  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `https://urlshortener-backend-sj.onrender.com/api/auth/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    }
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const btnEle = document.getElementById("btn_submit");
    btnEle.disabled = true;
    try {
      const { data } = await axios.post(url, { password, confirmPassword });
      setMsg(data.message);
      setError("");
    } catch (error) {
      if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500) {
        setError(error.response.data.message);
        setMsg("");
        btnEle.disabled = false;
      }
    }
  }

  return (
    <Fragment>
      {validUrl ? (<>
        <Header />
        <Container className='center-content'>
          <ToastContainer />
          <Form className='login-form my-4' onSubmit={handleSubmit}>
            <legend className='text-center primary-text'>
              Enter Your New Password
            </legend>
            <hr />
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>

            <Form.Group controlId='formBasicConfirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </Form.Group>

            {error && <div className="error_msg">{error}</div>}
            {msg && <div className="success_msg">{msg}</div>}
            <Button variant='primary' id='btn_submit' type='submit'>
              Submit
            </Button>
          </Form>
        </Container>
      </>) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default PasswordReset;
