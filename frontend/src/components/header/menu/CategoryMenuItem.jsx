import React, { useState } from 'react';
import Link from 'next/link';
import MenuItem from './MenuItem'; // Import the MenuItem component
import ViewAllProductsLink from './ViewAllProductsLink'; // Import the ViewAllProductsLink component
import ViewAllLink from '../../common/VIewAllLink';

const CategoryMenuItem = ({ category, categoryLabels, image }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    if (menu === activeMenu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <li className="menu-item-has-children position-inherit">
      <a href="#" className="drop-down">
        {category}
      </a>
      <i
        onClick={() => toggleMenu(category)}
        className={`bi bi-${activeMenu === category ? "dash" : "plus"} dropdown-icon`}
      />
      <div
        className={`mega-menu2 ${activeMenu === category ? "d-block" : ""}`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="megamenu-wrap">
          <ul className="menu-row">
            {categoryLabels.map((label, index) => (
              <MenuItem key={index} linkTo="/shop" label={label} />
            ))}
          </ul>
          <ViewAllProductsLink href="/shop" />
        </div>
      </div>
    </li>
  );
};

export default CategoryMenuItem;
