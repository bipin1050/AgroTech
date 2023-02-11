import { useRouter } from 'next/router';
import React from 'react'

import en from '../language/english';
import nep from '../language/nepali';

const Footer = () => {
    const router = useRouter();

    const { locale } = router;
    const t = locale ==='en'? en : nep ;

  return (
    <>
      <div className='footer'>
        <div className='links'>
          <div>
            <label>Quick Links</label>
          </div>
          <div className='flex justify-between'>
            <div >{t.home}</div>
            <div >{t.products}</div>
            <div >{t.contact}</div>
            <div >{t.blogs}</div>
            <div >{t.faq}</div>
            <div >{t.login}</div>
          </div>
        </div>
      </div>
      <div className='copyright'>
        &copy; Agro-Tech 2022. All right reserved.
      </div>
      <div className='base-bar'>
          <div className='home-bar'>{t.home}</div>
          <div className='message-bar'>{t.message}</div>
          <div className='cart-bar'>{t.cart}</div>
          <div className='profile-bar'>{t.profile}</div>
      </div>
    </>
  )
}

export default Footer;