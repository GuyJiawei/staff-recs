import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

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
      event.stopPropagation();
    // }

    try {
      const { data } = await loginUser({ variables: { ...userFormData } });
      console.log(data);
      // if (data && data.loginUser) {
      //   const token = data.loginUser.token;
      // const user = data.loginUser.user;
      Auth.login(data.login.token);
      navigate('/moviefeed');
      // }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <div className="login-page">
        <div className="container login-container" >
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto" >
            <div className="card border-0 shadow rounded-3 my-5" style={{ minWidth: '400px', maxWidth: '600px', minHeight: '500px', maxHeight: '1000px' }}>
              <div id='login-card' className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      value={userFormData.email}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      value={userFormData.password}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);
};

export default LoginForm;