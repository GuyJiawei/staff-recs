import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ name: '', username: '', email: '', password: '' });
  // set state for form validation
  // const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
      event.preventDefault();
      console.log(userFormData)
      event.stopPropagation();
     // setValidated(true);
    // } else {
      try {
        const { data }  = await createUser({ variables: { ...userFormData } });
        console.log(data);
        const token = data.createUser.token;
        Auth.login(data.createUser.token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }
      setUserFormData({
        name: '',
        username: '',
        email: '',
        password: '',
      });
    // }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="shadow p-4 p-sm-5" style={{ minWidth: '400px', maxWidth: '600px', minHeight: '700px', maxHeight: '1000px' }}>
        <h5 className="card-title text-center mb-5 fw-light fs-5">Signup</h5>
        <Form onSubmit={handleFormSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              name="name"
              value={userFormData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="myusername"
              name="username"
              value={userFormData.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <hr/>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={userFormData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <div className="d-grid mb-2">
            <Button className="btn-lg fw-bold text-uppercase" type="submit">Register</Button>
          </div>

          <hr className="my-4"/>

          {showAlert && (
            <Alert variant="danger">
              Something went wrong with your registration!
            </Alert>
          )}

        </Form>
      </Card>
    </Container>
  );
};

export default SignupForm;
