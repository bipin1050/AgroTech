import React, { useEffect, useState } from 'react';
import {AppBar, Box, Container, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//importing different icons from material icons.
// import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home"
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
// import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
// import ReportIcon from '@mui/icons-material/Report';
import CableIcon from '@mui/icons-material/Cable';
import LoginIcon from '@mui/icons-material/Login';
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import Image from 'next/image';
import logo from '../assets/img/logo.png';

//importing next useRouter class
import { useRouter } from 'next/router';

// these two lines below are used to import text of respective language
import en from '../language/english';
import nep from '../language/nepali';
import Link from 'next/link';
import { useAuth } from '../Authentication/auth';

const Header = () => {

    const router = useRouter();

    const { locale } = router; //destructing the router to find the current locale value
    const t = locale ==='en'? en : nep ; //this line is used to set value of t as per currently selected language

    //creating list of objects of menu items to be displayed in the navbar
    const menuItems = [
        {
            name: t.home,
            icon: <HomeIcon/>,
            path: "/"
        },
        {
            name: t.about,
            icon: <ContactPhoneIcon/>,
            path: "/about"
        },
        {
            name: t.contact,
            icon: <ContactPhoneIcon/>,
            path: "/contact"
        },
        {
            name: t.products,
            icon: <CableIcon />,
            path: "/products"
        },
        {
            name: t.blogs,
            icon: <LoginIcon />,
            path: "/blogs"
        },
        {
            name: t.faq,
            icon: <LoginIcon />,
            path: "/faq"
        }
    ]

    //if any meny icon is clicked, the path is updated and directed.
    const handleMenuClick = (path) => {
        router.push(path)
    }

    // creating menu so that to toogle if sidebar is open or not 
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

    // closing the sidebar if it is opened and the window is scrolled
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

    //following functions change the value of locale if repective language is selected
    const handleEnglish = () => {
        router.push('/','/',{ locale: "en" })
    }
    const handleNepali = () => {
        router.push('/','/',{ locale: "nep" })
    }

    const auth = useAuth();

    const handleProfile = () => {
        router.push('/profile')
    }

    //the following jsx is rendered to the website
  return (
    // setMenuFalse is triggered if anything is clicked and closes the sidebar if it is currently opened 
    <div onClick={()=> {setMenuFalse()}}>
        <div className='nav-container'>
            {/* div to show hamburger icon if the media size is mobile equivalent */}
            {/* <div className='hamburger-icon' onClick={()=>{toggleMenuClick()}}>
                {menuStyle==="menu1" && <ListItem button><MenuIcon fontSize='large' className='menu-icon'/></ListItem>}
                {menuStyle==="menu2" && <ListItem button><ArrowCircleLeftIcon fontSize='large' className='menu-icon'/></ListItem>}
            </div> */}

            <div className='logo-section'>
                {/* {t.title} */}
                <Image src = {logo} width={100} height={96} />
            </div>
            <div className='navdiv'>
                <div className ='navlink'>
                    {menuItems.map((nav,idx) => {
                        return(
                            <ListItem 
                                key = {idx}
                                button
                                onClick={()=> {handleMenuClick(nav.path)}}
                                // style={ router.pathname===nav.path ? { background: "#ffffff"} : {}}
                                id={ router.pathname===nav.path ? 'active-item' : 'inactive-item'}
                                className="nav-items"
                            >
                                {/* <ListItemIcon className='-mr-6 p-0 text-white'>
                                    {nav.icon}
                                </ListItemIcon> */}
                                <ListItemText primary={nav.name}/>
                            </ListItem>
                        )
                    })}
                </div>
            </div>
            {/* <div className={menuStyle}>
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
            </div> */}
            <div className='flex flex-col'>
                <div className='language flex py-3'>
                    <button onClick={() => handleEnglish()}>English</button>
                    <span>/</span>
                    <button onClick={() => handleNepali()}>नेपाली</button>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        {!auth.loggedIn && <Link href = '/login'> Login </Link>}
                        {auth.loggedIn && <button onClick={handleProfile}>Hello {auth.name}</button>}
                    </div>
                    <div>
                        <ShoppingCartIcon />
                        Cart
                    </div>   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header