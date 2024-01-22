"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { adminSidebarMenuData } from "../../../data/adminSidebarMenuData";
import { isActiveLink } from "../../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../../redux/features/toggle/toggleSlice";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";

const AdminSidebar = () => {
  const router = useRouter();
  console.log('sidebar rerendering....')

  const { menu } = useSelector((state) => state.toggle);

  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, { skip: !logout ? true : false });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
        
          {adminSidebarMenuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, router.asPath) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={menuToggleHandler}
            >
              <Link href={item.routePath}>
                <i className={`la ${item.icon}`}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
