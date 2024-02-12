"use client";
import Link from "next/link";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { adminMobileMenuData } from "../../../../data/adminMobileMenudata";
import SidebarHeader from "./SidebarHeader";
import { isActiveLink } from "../../../../utils/linkActiveChecker";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />

      <Sidebar>
        <Menu>
          {adminMobileMenuData.map((item) => (
            <MenuItem
              className={
                isActiveLink(item.routePath, router.asPath) ? "menu-active-link" : ""
              }
              key={item.id}
            >
              <Link legacyBehavior href={item.routePath}>
                <a>{item.label}</a>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>

    </div>
  );
};

export default Index;
