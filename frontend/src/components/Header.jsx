import React from 'react';

function Header() {
  return (
    <header className="tt-header tt-header-fixed" >
      <div className="tt-header-inner">
        {/* Add/remove class "tt-wrap" using conditional rendering */}
        <div className="tt-header-col">
          {/* Begin logo */}
          <div className="tt-logo">
            <a href="index.html">
              <img
                src="/images.png"
                className="tt-logo-light magnetic-item"
                alt="logo"
              />
            </a>
          </div>
        </div>

        <div className="tt-header-col">
          {/* Begin overlay menu toggle button */}
          <div id="tt-ol-menu-toggle-btn-wrap">
            <div className="tt-ol-menu-toggle-btn-text">
              <span className="text-menu" data-hover="Open">
                Menu
              </span>
              <span className="text-close">Close</span>
            </div>
            <div className="tt-ol-menu-toggle-btn-holder">
              <a href="#" className="tt-ol-menu-toggle-btn magnetic-item">
                <span></span>
              </a>
            </div>
          </div>
          {/* End overlay menu toggle button */}
        </div>
      </div>
    </header>
  );
}

export default Header;
