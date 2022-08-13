import React, { useEffect, useState } from 'react';

import {AppBar, Box, Container, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home"
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ReportIcon from '@mui/icons-material/Report';
import CableIcon from '@mui/icons-material/Cable';
import LoginIcon from '@mui/icons-material/Login';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import { useRouter } from 'next/router';

const Header = () => {

    const router = useRouter();

    const menuItems = [
        {
            name: "Home",
            icon: <HomeIcon/>,
            path: "/"
        },
        {
            name: "Contact",
            icon: <ContactPhoneIcon/>,
            path: "/contact"
        },
        {
            name: "Products",
            icon: <CableIcon />,
            path: "/products"
        },
        {
            name: "Blogs",
            icon: <LoginIcon />,
            path: "/blogs"
        },
        {
            name: "FAQ",
            icon: <LoginIcon />,
            path: "/faq"
        }
    ]

    const handleMenuClick = (path) => {
        router.push(path)
    }

    const [menuStyle, setMenuStyle] = useState("menu1")

    const toggleMenuClick = () => {
        if(menuStyle == "menu1")
            setMenuStyle("menu2");
        else
            setMenuStyle("menu1");
    }

    const setMenuFalse = () => {
        if(menuStyle === "menu2")
            setMenuStyle("menu1");
    }

    globalThis?.window?.addEventListener("scroll" , ()=> {
        if(menuStyle === "menu2")
            setMenuStyle("menu1");
    })

    // useEffect(() => {
    //     window.addEventListener("scroll" , ()=> {
    //         if(menuStyle === "menu2")
    //             setMenuStyle("menu1");
    //     })
    // }, []);
    

  return (
    <div onClick={()=> {setMenuFalse()}}>
        <div className='language'>
            <span>English</span>
            <span>/</span>
            <span>नेपाली</span>
        </div>
        <div className='nav-container'>
            <div className='hamburger-icon' onClick={()=>{toggleMenuClick()}}>
                {menuStyle==="menu1" && <ListItem button><MenuIcon fontSize='large' className='menu-icon'/></ListItem>}
                {menuStyle==="menu2" && <ListItem button><ArrowCircleLeftIcon fontSize='large' className='menu-icon'/></ListItem>}
            </div>

            <div className='logo-section'>
                Agro_tech
            </div>
            {/* <div className='nav-items'>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Buy/Sell</li>
                    <li>Products</li>
                    <li>Blogs</li>
                    <li>FAQ</li>
                </ul>
            </div> */}
            <div className='navlink'>
                {menuItems.map((nav,idx) => {
                        return(
                            <ListItem 
                                key = {idx}
                                button
                                onClick={()=> {handleMenuClick(nav.path)}}
                                style={ router.pathname===nav.path ? { background: "rgb(180, 240, 121)"} : {}}
                                className="nav-items"
                            >
                                <ListItemIcon className='-mr-6 p-0 text-white'>
                                    {nav.icon}
                                </ListItemIcon>
                                <ListItemText primary={nav.name}/>
                            </ListItem>
                        )
                    })}
            </div>
            <div className={menuStyle}>
                {menuItems.map((nav,idx) => {
                    return(
                        <ListItem 
                            key = {idx}
                            button
                            onClick={()=> {handleMenuClick(nav.path)}}
                            // style={ location.pathname===nav.path ? { background: "#2d2d2e"} : {}}
                            className="nav-items"
                        >
                            <ListItemIcon className=' text-white'>
                                {nav.icon}
                            </ListItemIcon>
                            <ListItemText primary={nav.name}/>
                        </ListItem>
                    )
                })}
            </div>
        </div>
        <div className='sidebar'>
            
        </div>
    </div>
  )
}

export default Header