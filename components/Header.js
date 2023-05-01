import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//importing different icons from material icons.
// import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
// import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
// import ReportIcon from '@mui/icons-material/Report';
import CableIcon from "@mui/icons-material/Cable";
import LoginIcon from "@mui/icons-material/Login";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import Image from "next/image";
import logo from "../assets/img/logo.png";
import nepal from "../assets/img/nepal.png";
import english from "../assets/img/english.png";

//importing next useRouter class
import Router, { useRouter } from "next/router";

// these two lines below are used to import text of respective language
import en from "../language/english";
import nep from "../language/nepali";
import Link from "next/link";
import { AuthContext, useAuth } from "../Authentication/auth";

const Header = () => {
  const router = useRouter();

  const { locale } = router; //destructing the router to find the current locale value
  const t = locale === "en" ? en : nep; //this line is used to set value of t as per currently selected language

  //creating list of objects of menu items to be displayed in the navbar
  const menuItems = [
    {
      name: t.home,
      icon: <HomeIcon />,
      path: "/",
    },
    {
      name: t.about,
      icon: <ContactPhoneIcon />,
      path: "/about",
    },
    {
      name: t.contact,
      icon: <ContactPhoneIcon />,
      path: "/contact",
    },
    {
      name: t.products,
      icon: <CableIcon />,
      path: "/products",
    },
    {
      name: t.blogs,
      icon: <LoginIcon />,
      path: "/blogs",
    },
    {
      name: t.faq,
      icon: <LoginIcon />,
      path: "/faq",
    },
  ];

  //if any meny icon is clicked, the path is updated and directed.
  const handleMenuClick = (path) => {
    router.push(path);
  };

  // creating menu so that to toogle if sidebar is open or not
  const [menuStyle, setMenuStyle] = useState("menu1");

  const toggleMenuClick = () => {
    if (menuStyle == "menu1") setMenuStyle("menu2");
    else setMenuStyle("menu1");
  };

  const setMenuFalse = () => {
    if (menuStyle === "menu2") setMenuStyle("menu1");
  };

  // closing the sidebar if it is opened and the window is scrolled
  globalThis?.window?.addEventListener("scroll", () => {
    if (menuStyle === "menu2") setMenuStyle("menu1");
  });

  // useEffect(() => {
  //     window.addEventListener("scroll" , ()=> {
  //         if(menuStyle === "menu2")
  //             setMenuStyle("menu1");
  //     })
  // }, []);

  //following functions change the value of locale if repective language is selected
  const handleEnglish = () => {
    router.push("/", "/", { locale: "en" });
  };
  const handleNepali = () => {
    router.push("/", "/", { locale: "nep" });
  };

  const { user, isLoading, notificationCount } = useContext(AuthContext);

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleCart = () => {
    router.push("/cart");
  };

  const handleNotification = () => {
    router.push("/notification");
  };

  //the following jsx is rendered to the website
  return (
    // setMenuFalse is triggered if anything is clicked and closes the sidebar if it is currently opened
    <div
      className="header shadow-[0_19px_6px_-15px_rgba(0,0,0,0.4)]"
      onClick={() => {
        setMenuFalse();
      }}>
      <div class="flex justify-between items-center p-2 bg-gray-100 border-b border-gray-500 ">
        <div class="flex items-center">
          <div class="flex items-center mr-4">
            <CallIcon />
            <p class="text-gray-700">9863490911</p>
          </div>
          <div class="flex items-center">
            <MailOutlineIcon />
            <p class="text-gray-700 ml-4">info@agrotech.com</p>
          </div>
        </div>
        <div className="flex">
          <div>
            {user && (
              <button onClick={handleNotification}>
                <Badge
                  badgeContent={notificationCount}
                  color="secondary"
                  overlap="circular">
                  <NotificationsIcon />
                </Badge>
              </button>
            )}
          </div>
          <div className="pr-2">
            {!user && (
              <button
                className="px-3"
                onClick={() => {
                  Router.push("/login");
                }}>
                <PermIdentityOutlinedIcon />
                <span> Login </span>
              </button>
            )}
            {user && (
              <div>
                <button className="px-3" onClick={handleProfile}>
                  Hi {user.name.split(" ")[0]}
                </button>
                <button onClick={() => handleCart()}>
                  <ShoppingCartIcon />
                  Cart
                </button>
              </div>
            )}
          </div>
          <div className="flex px-2">
            {router.locale == "nep" && (
              <button onClick={() => handleEnglish()}>
                <img src={english.src} width={20} />
              </button>
            )}
            {router.locale == "en" && (
              <button onClick={() => handleNepali()}>
                <img src={nepal.src} width={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* div below this should be sticky for top-0 */}
      <div className="nav-container bg-gray-100 border-b border-gray-500 z-[1000]">
        <div className="flex flex-col item-center">
          <Image
            src={logo}
            width={90}
            height={87}
            onClick={() => {
              Router.push("/");
            }}
          />
        </div>
        <div className="navdiv">
          <div className="navlink">
            {menuItems.map((nav, idx) => {
              return (
                <ListItem
                  key={idx}
                  onClick={() => {
                    handleMenuClick(nav.path);
                  }}
                  id={
                    router.pathname === nav.path
                      ? "active-item"
                      : "inactive-item"
                  }
                  className="nav-items hover:cursor-pointer">
                  <ListItemText primary={nav.name} />
                </ListItem>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
