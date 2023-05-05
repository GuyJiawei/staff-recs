import React, { useState } from 'react';
import { CREATE_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ name: '', username: '', email: '', password: '' });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error }] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const { data } = await createUser({ variables: { ...userFormData } });
        const token = data.addUser.token;
        Auth.login(token);
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
    }
  };

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex">
              {/* <!-- Background image for card set in CSS! --> */}
            </div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Signup</h5>
              <form noValidate onSubmit={handleFormSubmit} validated={validated.toString()}>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputName"
                    placeholder="John Doe"
                    name="name"
                    value={userFormData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="floatingInputName">Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputUsername"
                    placeholder="myusername"
                    name="username"
                    value={userFormData.username}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="floatingInputUsername">Username</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    name="email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="floatingInputEmail">Email address</label>
                </div>

                <hr/>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid mb-2">
                  <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
                </div>

                <hr className="my-4"/>

                {showAlert && (
                  <div className="alert alert-danger" role="alert">
                    Something went wrong with your registration!
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default SignupForm;