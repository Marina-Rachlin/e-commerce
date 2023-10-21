"use client";
import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

const Verification = ({ name }) => {
  const { control, handleSubmit } = useForm();
  const [verifyNumber, setVerifyNumber] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [invalidError, setInvalidError] = useState(false);

  const handleInputChange = (value, index) => {
    const newVerifyNumber = [...verifyNumber];
    newVerifyNumber[index] = value;
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const onSubmit = () => {
    const joinedNumber = verifyNumber.join("");
    console.log(joinedNumber);
    setInvalidError(true);
  };

  return (
    <div
      className={name}
      id="login"
      role="tabpanel"
      aria-labelledby="login-tab"
    >
      <div className="login-registration-form">
        <div className="form-title">
          <h3 style={{ marginBottom: "15px" }}>Verify your Account</h3>
          <p style={{ marginBottom: "30px" }}>
            Enter the verification code sent to your email address:
            john.doe@email.com
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-35">
            {verifyNumber.map((value, index) => (
              <div className="col-3 d-flex justify-content-center" key={index}>
                <Controller
                  name={`val${index + 1}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`form-control text-center ${
                        invalidError ? " shake border-danger" : ""
                      }`}
                      value={value}
                      onChange={(e) => handleInputChange(e.target.value, index)}
                      maxLength={1}
                      ref={inputRefs[index]}
                      style={{
                        height: "50px",
                        maxWidth: "50px",
                      }}
                    />
                  )}
                />
              </div>
            ))}
          </div>

          <button type="submit" className="primary-btn1 hover-btn3">
            Verify
          </button>

          <div className="member d-flex justify-content-center align-items-center">
            <p>Didn't get the mail?
                 <a href="#">Resend</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
