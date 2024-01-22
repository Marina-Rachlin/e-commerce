import React, {useState} from "react";
import { signIn } from "next-auth/react";

const LoginWithSocial = () => {
    return (
      <div className="btn-box row">
        <div className="col-lg-6 col-md-12">
          <a href="#" className="theme-btn social-btn-two facebook-btn" onClick={() => signIn("facebook")}>
            <i className="fab fa-facebook-f"></i> Log In via Facebook
          </a>
        </div>
        <div className="col-lg-6 col-md-12">
          <a href="#" className="theme-btn social-btn-two google-btn" onClick={() => signIn("google")}>
            <i className="fab fa-google"></i> Log In via Gmail
          </a>
        </div>
      </div>
    );
  };
  
  export default LoginWithSocial;

  
  