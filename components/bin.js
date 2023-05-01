<div className="nav-container">
  {/* div to show hamburger icon if the media size is mobile equivalent */}
  {/* <div className='hamburger-icon' onClick={()=>{toggleMenuClick()}}>
                {menuStyle==="menu1" && <ListItem button><MenuIcon fontSize='large' className='menu-icon'/></ListItem>}
                {menuStyle==="menu2" && <ListItem button><ArrowCircleLeftIcon fontSize='large' className='menu-icon'/></ListItem>}
            </div> */}

  <div className="logo-section">
    {/* {t.title} */}
    <Image
      src={logo}
      width={100}
      height={96}
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
            button
            onClick={() => {
              handleMenuClick(nav.path);
            }}
            // style={ router.pathname===nav.path ? { background: "#ffffff"} : {}}
            id={router.pathname === nav.path ? "active-item" : "inactive-item"}
            className="nav-items">
            {/* <ListItemIcon className='-mr-6 p-0 text-white'>
                                    {nav.icon}
                                </ListItemIcon> */}
            <ListItemText primary={nav.name} />
          </ListItem>
        );
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
  <div className="flex flex-col">
    <div className="language flex py-3">
      <button onClick={() => handleEnglish()}>English</button>
      <span>/</span>
      <button onClick={() => handleNepali()}>नेपाली</button>
    </div>
    <div className="flex flex-row gap-5">
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
      <div>
        {!user && (
          <button
            onClick={() => {
              Router.push("/login");
            }}>
            <PermIdentityOutlinedIcon />
            <span> Login </span>
          </button>
        )}
        {user && (
          <button onClick={handleProfile}>Hi {user.name.split(" ")[0]}</button>
        )}
      </div>
      <div>
        {user && (
          <button onClick={() => handleCart()}>
            <ShoppingCartIcon />
            Cart
          </button>
        )}
      </div>
    </div>
  </div>
</div>;










<div className="nav-container flex items-end sticky top-0">
  <div className="flex flex-col">
    {/* {t.title} */}
    <Image
      src={logo}
      width={80}
      height={74}
      onClick={() => {
        Router.push("/");
      }}
    />
  </div>
  <div className="navdiv">
    <div className="navlink flex justify-end">
      {menuItems.map((nav, idx) => {
        return (
          <div
            key={idx}
            className="nav-items"
            id={router.pathname === nav.path ? "active-item" : "inactive-item"}
            // button
            onClick={() => {
              handleMenuClick(nav.path);
            }}>
            {/* <ListItemText className="font-bold" primary={nav.name} /> */}
            <label className="pl-5  font-medium hover:cursor-pointer">
              {nav.name}
            </label>
          </div>
        );
      })}
    </div>
  </div>
</div>;