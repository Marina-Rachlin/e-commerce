'use client'
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Protected from "../../../hooks/useProtected";

//Custom components
import UserSidebar from "../../../components/profile/userSidebar";
import UserAccountContent from "../../../components/profile/UserAccountContent";
import {getInitials} from '../../../utils/get-initials';

//Redux imports
import { useSelector } from "react-redux";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import {useEditProfileMutation, useUpdateAvatarMutation} from "../../../redux/features/users/userApi";

import { toast } from "react-hot-toast";

const MyAccount = () => {
  const { user } = useSelector((state) => state.auth);

  const [logout, setLogout] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const {refetch} = useLoadUserQuery(undefined,{});
  const {} = useLogOutQuery(undefined, { skip: !logout ? true : false }); //When logout is false, the query will be skipped.

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  //Get initials
  let initials = "";
  if (user) {
    initials = getInitials(user.name)
  }

  //Change Avatar
  const imageHandler = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await editProfile({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          addresses: data.addresses,
      });
 
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  useEffect(() => {
    if (error || updateError) {
      console.log(error);
    }
    if (isSuccess || success) {
      toast.success("Profile updated successfully!");
      refetch(); 
    }
  }, [isSuccess, error, success, updateError]);

  return (
    <Protected>
      <div className="dashboard-section mt-110 mb-110">
        <div className="container">
          <div className="row g-4">
            <UserSidebar
              user={user}
              initials={initials}
              logOutHandler={logOutHandler}
            />
            <UserAccountContent
              user={user}
              initials={initials}
              imageHandler={imageHandler}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default MyAccount;
