import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='language'>
            <span>English</span>
            <span>/</span>
            <span>नेपाली</span>
        </div>
        <div className='nav-container'>
            <div className='logo-section'>
                Agro_tech
            </div>
            <div className='nav-items'>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Buy/Sell</li>
                    <li>Products</li>
                    <li>Blogs</li>
                    <li>FAQ</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header