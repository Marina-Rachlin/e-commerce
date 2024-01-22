"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useUpdatePasswordMutation} from "../../redux/features/users/userApi";
import {toast} from "react-hot-toast";

const PasswordChange = ({ user }) => {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(defaultValues);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, {isSuccess, error}] = useUpdatePasswordMutation();

  const schema = Yup.object().shape({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const handlePasswordCancel = () => {
    setFormData(defaultValues);
  };

  const handlePasswordChange = async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;

    if(newPassword !== confirmPassword){
        toast.error("Password doesn't match")
    }
    else{
       await updatePassword({oldPassword, newPassword});
    }
  };

  useEffect(() => {
    if(isSuccess){
        toast.success("Password updated successfully");
    }
    if(error){
       if("data" in error){
        const errorData = error;
        toast.error(errorData.data.message);
       }
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="mt-5 mb-4">
        <h3>Password Change</h3>
        <p>Password must be Minimum 8 characters long, uppercase & symbol</p>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit(handlePasswordChange)}>
            <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
                <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                  <div className="form-inner">
                    <div className="input-with-icon">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        name="oldPassword"
                        placeholder="Current Password"
                        {...field}
                        className={`${
                          errors.oldPassword ? "is-invalid" : ""
                        } form-control`}
                      />
                      <i
                        className={`bi ${
                          showOldPassword ? "bi-eye" : "bi-eye-slash"
                        }`}
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      />
                    </div>
                    {errors.oldPassword && (
                      <small className="text-danger">
                        {errors.oldPassword?.message}
                      </small>
                    )}
                  </div>
                </div>
              )}
            />
        <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <div className="input-with-icon">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="New Password"
                      {...field}
                      className={`${
                        errors.newPassword ? "is-invalid" : ""
                      } form-control`}
                    />
                    <i
                      className={`bi ${
                        showNewPassword ? "bi-eye" : "bi-eye-slash"
                      }`}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  </div>
                  {errors.newPassword && (
                    <small className="text-danger">
                      {errors.newPassword?.message}
                    </small>
                  )}
                </div>
              </div>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <div className="input-with-icon">
                    <input
                     {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      className={`${
                        errors.confirmPassword ? "is-invalid" : ""} form-control`}
                    />
                    <i
                      className={`bi ${
                        showConfirmPassword ? "bi-eye" : "bi-eye-slash"
                      }`}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>
                  {errors.confirmPassword && (
                    <small className="text-danger">{errors.confirmPassword?.message}</small>
                  )}
                </div>
              </div>
            )}
          />
          <div className="col-12">
            <div className="button-group">
              <button
                type="submit"
                className="primary-btn3 black-bg hover-btn5 hover-white"
              >
                Change Password
              </button>
              <button
                className="primary-btn3 hover-btn5"
                onClick={handlePasswordCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PasswordChange;
