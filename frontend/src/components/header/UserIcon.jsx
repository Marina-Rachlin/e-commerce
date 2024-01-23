import React, { useEffect, useState } from 'react';
import UserDropdown from './UserDropdown';
import UserAuth from "../../hooks/userAuth"

const UserIcon = () => {
  const isAuthenticated = UserAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once the component mounts on the client.
    setIsClient(true);
  }, []);

  // Render null or a simple loader on the server and during the initial client render.
  if (!isClient) {
    return null; // or return <SimpleLoader />;
  }

  return (
    <div>
      {isAuthenticated ? (
        <UserDropdown />
      ) : (
        <button
          type="button"
          className="user-btn"
          data-bs-toggle="modal"
          data-bs-target="#user-login">
          <svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_122_313)">
              <path d="M15.364 11.636C14.3837 10.6558 13.217 9.93013 11.9439 9.49085C13.3074 8.55179 14.2031 6.9802 14.2031 5.20312C14.2031 2.33413 11.869 0 9 0C6.131 0 3.79688 2.33413 3.79688 5.20312C3.79688 6.9802 4.69262 8.55179 6.05609 9.49085C4.78308 9.93013 3.61631 10.6558 2.63605 11.636C0.936176 13.3359 0 15.596 0 18H1.40625C1.40625 13.8128 4.81279 10.4062 9 10.4062C13.1872 10.4062 16.5938 13.8128 16.5938 18H18C18 15.596 17.0638 13.3359 15.364 11.636ZM9 9C6.90641 9 5.20312 7.29675 5.20312 5.20312C5.20312 3.1095 6.90641 1.40625 9 1.40625C11.0936 1.40625 12.7969 3.1095 12.7969 5.20312C12.7969 7.29675 11.0936 9 9 9Z" />
            </g>
          </svg>
        </button>
      )}
    </div>
  );
};

export default UserIcon;

