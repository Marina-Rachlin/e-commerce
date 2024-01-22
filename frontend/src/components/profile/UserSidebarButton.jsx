import React from 'react';

const UserSidebarButton = ({ label, iconPaths, id, dataBsTarget, ariaControls }) => {
  return (
    <button
      className="nav-link nav-btn-style mx-auto"
      type="button"
      role="tab"
      id={id}
      data-bs-toggle="pill"
      data-bs-target={dataBsTarget}
      aria-controls={ariaControls}
      aria-selected="true"
    >
      <svg
        width={20}
        height={20}
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_382_377)">
          {iconPaths.map((iconPath, index) => (
            <path key={index} d={iconPath} />
          ))}
        </g>
      </svg>
      {label}
    </button>
  );
};


export default UserSidebarButton;
