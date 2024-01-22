import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";

const Login = ({ handleTabChange, name}) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const[login, {isSuccess, error}] = useLoginMutation();
  const {refetch} = useLoadUserQuery(undefined,{});

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6)
  });

  const defaultValues = {
    email: "",
    password: ""
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    await login(data);
  }

useEffect(() => {
  if (isSuccess) {
    toast.success("Login Successfully!", {duration: 2000});
    // setOpen(false);
   refetch(); 
  }
  if (error) {
    if ("data" in error) {
      const errorData = error;
      console.log(errorData)
    }
  }
}, [isSuccess, error]);

  return (
    <div className={name} id="login" role="tabpanel" aria-labelledby="login-tab">
      <div className="login-registration-form">
        <div className="form-title">
          <h3>Log In</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-inner mb-35">
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
            Log In
          </button>

          <div className="member d-flex justify-content-center align-items-center">
            <p>Not a member yet?
                 <a href="#" onClick={() => handleTabChange("registration")}> Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
