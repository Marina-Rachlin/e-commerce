import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import Protected from "../../../hooks/useProtected";
import Script from "next/script";

// Custom components
import UserSidebar from "../../../components/profile/UserSidebar";
import UserAccountContent from "../../../components/profile/UserAccountContent";
import { getInitials } from '../../../utils/get-initials';

// Redux imports
import { useSelector } from "react-redux";
import { useUpdateAvatarMutation, useEditProfileMutation } from "../../../redux/features/users/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { toast } from "react-hot-toast";

const MyAccount = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateAvatar, { isSuccess: isAvatarUpdated, error: avatarError }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: isProfileUpdated, error: profileError }] = useEditProfileMutation();
  const { refetch } = useLoadUserQuery();

  const logOutHandler = async () => {
    await signOut({ callbackUrl: '/your-logout-callback-url' }); // Update callback URL as needed
  };

  // Handle image update
  const imageHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const avatar = await readFileAsDataURL(file);
      updateAvatar(avatar);
    }
  };

  // Helper function to read file as data URL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (data) => {
    try {
      await editProfile({
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
    if (avatarError || profileError) {
      toast.error("An error occurred while updating.");
    }
    if (isAvatarUpdated || isProfileUpdated) {
      toast.success("Profile updated successfully!");
      refetch();
    }
  }, [isAvatarUpdated, avatarError, isProfileUpdated, profileError]);

  let initials = user ? getInitials(user.name) : "";

  return (
    <>
     <Script async src="https://www.googletagmanager.com/gtag/js?id=G-81GLR4VQK9"></Script>
      <Script>
        {
          ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-81GLR4VQK9');`
        }
      </Script>
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
    </>
  );
};

export default MyAccount;

