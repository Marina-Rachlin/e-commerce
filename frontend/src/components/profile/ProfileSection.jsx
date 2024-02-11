"use client";
import React, { useState } from "react";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import PasswordChange from "./PasswordChange";

const ProfileSection = ({ user, initials, imageHandler, onSubmit }) => {
  const defaultFormData = {
    firstName: user && user.name ? user.name.split(" ")[0] : "",
    lastName: user && user.name ? user.name.split(" ")[1] : "",
    contactNumber: user && user.phoneNumber ? user.phoneNumber : "",
    email: user && user.email ? user.email : "",
    city:
      user && user.addresses && user.addresses.length > 0
        ? user.addresses[0].city
        : "",
    address:
      user && user.addresses && user.addresses.length > 0
        ? user.addresses[0].address
        : "",
    zipCode:
      user && user.addresses && user.addresses.length > 0
        ? user.addresses[0].postalCode
        : "",
    country:
      user && user.addresses && user.addresses.length > 0
        ? user.addresses[0].country
        : "",
    currentPassword: user && user.password ? user.password : "",
    newPassword: "",
    confirmPassword: "",
  };
  

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (value, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(defaultFormData);
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    const name = `${formData.firstName} ${formData.lastName}`;
    const address = {
      country: formData.country,
      city: formData.city,
      address: formData.address,
      postalCode: formData.zipCode,
    };
    const data = {
      name: name,
      email: formData.email,
      phoneNumber: formData.contactNumber,
      addresses: address,
    };

    // Pass the form data to the parent component
    onSubmit(data);
  };

  return (
    <div
      className="tab-pane fade"
      id="v-pills-profile"
      role="tabpanel"
      aria-labelledby="v-pills-profile-tab"
    >
      <div className="dashboard-profile">
        <div className="table-title-area">
          <h3>Edit Your Profile</h3>
          <p>
            From your My Profile section you have the ability to update your
            account information. Select a link below to view or edit
            information.
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-5">
          <div className="position-relative">
            <div
              className="rounded-circle overflow-hidden border border-dark"
              style={{ width: "160px", height: "160px" }}
            >
              {user?.avatar ? (
                <Image
                  src={user?.avatar.url}
                  alt="User Avatar"
                  width={160}
                  height={160}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center text-dark"
                  style={{ width: "100%", height: "100%" }}
                >
                  <span className="avatar-initials-big">{initials}</span>
                </div>
              )}
            </div>
            <label
              htmlFor="avatar"
              className="camera-icon-container rounded-circle position-absolute d-flex align-items-center justify-content-center bg-secondary text-white"
              style={{ width: "40px", height: "40px", bottom: "0", right: "0" }}
            >
              <i className="fas fa-camera" style={{ fontSize: "20px" }}></i>
              <input
                type="file"
                name=""
                id="avatar"
                className="hidden visually-hidden"
                onChange={imageHandler}
                accept="image/png,image/jpg,image/jpeg,image/webp"
              />
            </label>
          </div>
        </div>
        <div className="form-wrapper">
          <form onSubmit={handleLocalSubmit}>
            <div className="row">
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name*"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange(e.target.value, "firstName")}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name*"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange(e.target.value, "lastName")}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter your contact number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      handleChange(e.target.value, "contactNumber")
                    }
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email address*"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e.target.value, "email")}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <label>Country</label>
                  <SelectComponent
                    options={["Bangladesh", "Afghanistan", "India", "China"]}
                    placeholder="Country"
                    selectedOption={formData.country} // Change 'value' to 'selectedOption'
                    onChange={(value) => handleChange(value, "country")}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleChange(e.target.value, "city")}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={formData.address}
                    onChange={(e) => handleChange(e.target.value, "address")}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-6 mb-25">
                <div className="form-inner">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleChange(e.target.value, "zipCode")}
                  />
                </div>
              </div>
              </div>

              <div className="col-12">
                <div className="button-group mb-15">
                  <button
                    type="submit"
                    className="primary-btn3 black-bg hover-btn5 hover-white"
                  >
                    Update Profile
                  </button>
                  <button
                    className="primary-btn3 hover-btn5"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
          </form>
        </div>
        < PasswordChange user={user} />
    </div>
    </div>
  );
};

export default ProfileSection;
