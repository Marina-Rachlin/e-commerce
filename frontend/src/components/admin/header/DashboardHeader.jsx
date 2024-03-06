import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { adminDropdownMenuData } from "../../../data/adminDropdownMenuData";
import { isActiveLink } from "../../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../../redux/features/notifications/notificationsApi";
import { format } from "timeago.js";
import Notifications from "./NOtifications";

const DashboardHeader = ({ user }) => {
  // const { user } = useSelector((state) => state.auth);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {refetchOnMountOrArgChange: true});
  const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [audio] = useState(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/dmdv8s9mz/video/upload/v1705607580/audio/hpt281hdubmqn8exmoud.mp3"
      )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  const handleNotificationStatusChange = async (id) => {
    await updateNotificationStatus(id);
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.adminNotifications.filter((item) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess, audio]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  return (
    <header className="main-header header-shaddow fixed-header">
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/" legacyBehavior>
                  <a>
                  <Image
                    alt="brand"
                    src="/assets/img/sm-logo.svg"
                    width={30}
                    height={10}
                    priority
                  />
                   Beautime

                  </a>
                </Link>
               
              </div>
            </div>
            {/* End .logo-box */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            {/* Notifications */}
            <div className="dropdown dashboard-option menu-btn">
              <a
                className="dropdown-toggle no-after-element"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                
                {notifications && notifications.length > 0 && (
                  <span className="count">{notifications.length}</span>
                )}
                <span className="icon la la-bell"></span>
              </a>

              <div className="dropdown-menu" style={{ minWidth: "300px" , padding: '0px'}}>
                {notifications && notifications.length > 0 ? (
                  notifications.map((item, index) => (
                    <ul className="notification-list" key={index}>
                      <li style={{paddingBottom: '0px'}}>
                        <i className={`icon ${item.type === 'order' ? 'las la-shopping-cart' : 'las la-comment'}`} style={{ color: item.type === 'order' ? '#33a852' : '#f9aa00' }}></i>

                        <div className="notification-content">
                          <strong className="notification-title">
                            {item.title}
                          </strong>
                          <span className="notification-message">
                            {item.message}
                          </span>
                          <small className="notification-date">
                          {format(item.createdAt)}
                        </small>
                        </div>
                        <span className="close-icon" onClick={() => handleNotificationStatusChange(item._id)}>&times;</span>
                      </li>
                    </ul>
                  ))
                ) : (
                  <div className="text-center p-3">
                    <p className="text-muted">No new notifications.</p>
                  </div>
                )}
              </div>
            </div>

            {/* End notifications */}

            {/* <!-- Dashboard Option --> */}
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.avatar ? (
                  <Image
                    alt="avatar"
                    className="thumb"
                    src={user?.avatar.url}
                    width={50}
                    height={50}
                  />
                ) : (
                  <Image
                    alt="avatar"
                    className="thumb"
                    src="/assets/img/avatars/001-man.svg"
                    width={50}
                    height={50}
                  />
                )}
                <span className="name">{user?.name}</span>
              </a>

              <ul className="dropdown-menu">
                {adminDropdownMenuData.map((item) => (
                  <li
                    className={`${
                      isActiveLink(item.routePath, router.asPath)
                        ? "active"
                        : ""
                    } mb-1`}
                    key={item.id}
                  >
                    <Link href={item.routePath}>
                      <i className={`la ${item.icon}`}></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
