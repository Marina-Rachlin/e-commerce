"use client";
import Link from "next/link";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import {adminMobileMenuData} from "../../../../data/adminMobileMenudata"
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChild,
} from "../../../../utils/linkActiveChecker";
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
              <SubMenu
                className={
                  isActiveParentChild(item.items, router.asPath)
                    ? "menu-active"
                    : ""
                }
                label={item.label}
                key={item.id}
              >
                {item.items.map((menuItem, i) => (
                  <MenuItem
                    className={
                      isActiveLink(menuItem.routePath, router.asPath)
                        ? "menu-active-link"
                        : ""
                    }
                    key={i}
                    // routerLink={<Link href={menuItem.routePath} />}
                    
                  >
                    {menuItem.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </Sidebar>
{/* 
      <SidebarFooter /> */}
    </div>
  );
};

export default Index;
