import React, { useState } from "react";
import "./index.css";
import { useAuth } from "../../reducers/authState";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// import { Search } from "@material-ui/icons";
import "./index.css";


// toast.configure();


const ResetPassword = () => {
  // eslint-disable-next-line
  const { loading, reset_Password } = useAuth();

  const initialValues = { newPassword: "", confirmPassword: "" };

  const [formValues, setFormValues] = useState(initialValues);

  const notify = () => toast('Reset Password Successful. Click on the link to go back to login');
  const showError = (message) => toast(message);

  const [, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const { search } = useLocation();
  const token = search.split("=")[1];
  const resetPassword = async () => {
    const response = await axios.post(
      `https://mentorship-payment-app.herokuapp.com/api/v1/reset-password?token=${token}`,
      {
        newPassword: formValues.newPassword,
        confirmPassword: formValues.confirmPassword,
      }
    );
    if (response.data.result !== null) {
      notify();
    } else {
      showError(response.data.message)
    }
    // console.log(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    resetPassword();
    setIsSubmit(true);
  };
  return (
    <div className="app__resetPassword-container">
      <div className="app__resetPassword-form">
        <div className="app__resetPassword-form-subDiv">
          <h2 className="app__resetPassword-h2">Reset Password</h2>

          <form>
            <div>
              <div className="inputField">
                <label className="app__resetPassword-label">
                  {" "}
                  New Password
                </label>

                <input
                  type="password"
                  value={formValues.newPassword}
                  name="newPassword"
                  placeholder="Enter your new Password"
                  className="app__resetPassword-input"
                  onChange={handleChange}
                />
              </div>

              <div className="inputField">
                <label className="app__resetPassword-input">
                  {" "}
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={formValues.confirmPassword}
                  name="confirmPassword"
                  placeholder="Re-enter your Password"
                  className="app__resetPassword-input"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="app__resetPassword-btnDiv">
              <button
                action=""
                className="app__resetPassword-resetBtn"
                name="Reset Password"
                onClick={handleSubmit}
              >
                {" "}
                Reset Password
              </button>
              <ToastContainer />
            </div>
            
          </form>
        </div>

        <div>
        <a href="/login" className = "app__resetPassword-aTag">
            Back To Login
          </a>
        </div>

      </div>

      <div className="app__resetPassword-picture"> </div>

       
    </div>
  );
};

export default ResetPassword;
