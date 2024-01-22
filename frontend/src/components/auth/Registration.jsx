'use client'
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRegisterMutation } from "../../redux/features/auth/authApi"; 
import { toast } from "react-hot-toast";

const Registration = ({ handleTabChange, name, handleContentChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isSuccess, error, data }] = useRegisterMutation();

  const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email!").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6),
  });

  const defaultValues = {
    name: '',
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

  const onSubmit =async (data) => {
    await register(data);
  }

  useEffect(() => {
    if (isSuccess) {
      const message = data? data.message || "Registration successful" : "Registration successful";
      const token = data? data.activationToken : "token not found";
      toast.success(message);
      handleContentChange("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        console.log(errorData);
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  

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
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="User Name *"
                  className={`${errors.name ? "is-invalid" : ""} form-control`}
                />
              )}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
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

          <div className="member d-flex justify-content-center align-items-center">
            <p>Already have an account?
               <a href="#" onClick={() => handleTabChange("login")}> Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
