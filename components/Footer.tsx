import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='links'>
          <div>
            <label>Quick Links</label>
          </div>
          <div className='flex justify-between'>
            <div >Home</div>
            <div >Products</div>
            <div >Contact</div>
            <div >Blogs</div>
            <div >FAQ</div>
            <div >Login</div>
          </div>
        </div>
      </div>
      <div className='copyright'>
        &copy; Netlink 2022. All right reserved.
      </div>
      <div className='base-bar'>
          <div className='home-bar'>Home</div>
          <div className='message-bar'>Message</div>
          <div className='cart-bar'>Cart</div>
          <div className='profile-bar'>Profile</div>
      </div>
    </>
  )
}

export default Footer;