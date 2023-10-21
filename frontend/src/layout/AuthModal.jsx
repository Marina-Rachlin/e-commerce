'use client'
import React, { useState } from "react";
import Login from "../components/auth/Login"; 
import Registration from "../components/auth/Registration"; 
import Verification from "../components/auth/Verification";

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [content, setContent] = useState('registration');
  const name ='tab-pane fade show active';

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleContentChange = (content) => {
    setContent(content);
  };

  return (
    <div className="modal login-modal fade" id="user-login" data-bs-keyboard="false" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login"
                  type="button"
                  role="tab"
                  aria-controls="login"
                  aria-selected={activeTab === 'login'}
                  onClick={() => handleTabChange("login")}
                >
                  Log In
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'registration' ? 'active' : ''}`}
                  id="register-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#register"
                  type
                  ="button"
                  role="tab"
                  aria-controls="register"
                  aria-selected={activeTab === 'registration'}
                  onClick={() => handleTabChange("registration")}
                >
                  Registration
                </button>
              </li>
            </ul>
          </div>
          <div className="modal-body">
            <div className="tab-content" id="myTabContent">
              {activeTab === "login" ? (
                <Login
                  handleTabChange={handleTabChange}
                  className={name}
                />
              ) : (
                content === "registration" ? (
                  <Registration handleTabChange={handleTabChange} className={name} handleContentChange={handleContentChange}/>
                ) : (
                  <Verification className={name}/>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
