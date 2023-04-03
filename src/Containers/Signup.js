import React, { Fragment, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../Redux/actions/auth.actions';
import Header from '../Components/Header';
import { ToastContainer } from 'react-toastify';

const Signup = (props) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const btnEle = document.getElementById("btn_signup");
    btnEle.disabled = true;
    props.submitForm(formData);
  };

  return props.isLoggedIn ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <Header />
      <Container className='center-content'>
        <ToastContainer />
        <Form className='login-form my-4' onSubmit={(e) => handleSubmit(e)} style={{width: '90vw'}}>
          <legend className='text-center primary-text'>
            Signup to continue :{' '}
          </legend>
          <hr />

          <Form.Group controlId='formBasicFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter First Name'
              name='firstName'
              onChange={(e) => handleChange(e)}
              value={formData.firstName}
              required
            />
          </Form.Group>


          <Form.Group controlId='formBasicLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Last Name'
              name='lastName'
              onChange={(e) => handleChange(e)}
              value={formData.lastName}
              required
            />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              onChange={(e) => handleChange(e)}
              value={formData.email}
              required
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              onChange={(e) => handleChange(e)}
              value={formData.password}
              required
            />
          </Form.Group>

          <Form.Group controlId='formBasicConfirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              onChange={(e) => handleChange(e)}
              value={formData.confirmPassword}
              required
            />
          </Form.Group>

          <Button variant='primary' id='btn_signup' type='submit'>
            Submit
          </Button>
          <hr></hr>
          <div className="text-center">
            <Link className="small" to="/login">Already have an account? Login!</Link>
          </div>
        </Form>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.auth.isLoggedIn,
  type: ownProps.type,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitForm: (body) => dispatch(signup(body))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
