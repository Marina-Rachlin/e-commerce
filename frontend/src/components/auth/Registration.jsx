'use client'

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Registration = ({ handleTabChange, name, handleContentChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string().email("Invalid email!").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6),
  });

  const defaultValues = {
    username: '',
    email: '',
    password: '',
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    // You can submit the form data to your API or handle it as needed.
    console.log("Form Data:", data);
    handleContentChange("verification"); // Change the content to "verification"
    // Perform registration logic here.
  };

  return (
    <div
      className={name}
      id="register"
      role="tabpanel"
      aria-labelledby="register-tab"
    >
      <div className="login-registration-form">
        <div className="form-title">
          <h3>Registration</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inner mb-25">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="User Name *"
                  className={`${errors.username ? "is-invalid" : ""} form-control`}
                />
              )}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          <div className="form-inner mb-25">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email Here *"
                  className={`${errors.email ? "is-invalid" : ""} form-control`}
                />
              )}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-inner mb-25">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  className={`${errors.password ? "is-invalid" : ""} form-control`}
                />
              )}
            />
            <i
            className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
            style={{ bottom: errors.password ? "35px" : "13px" }}
            onClick={() => setShowPassword(!showPassword)}
          />
             {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="primary-btn1 hover-btn3">
            Registration
          </button>

          <div className="member">
            <p>Already have an account?
               <a href="#" onClick={() => handleTabChange("login")}>Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
