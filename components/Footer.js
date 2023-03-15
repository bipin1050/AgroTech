import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../Authentication/auth";

import en from "../language/english";
import nep from "../language/nepali";

const Footer = () => {
  const router = useRouter();
  const auth = useAuth();

  const { locale } = router;
  const t = locale === "en" ? en : nep;

  return (
    <div>
      <div className="text-black w-full mt-4 p-[2.5%] bg-[#d9d9d9] border-b-[3px] border-[#787881]">
        <div className="w-1/2">
          <div>
            <label>Quick Links</label>
          </div>
          <div className="flex justify-between">
            <div
              onClick={() => {
                Router.push("/");
              }}
              className="hover:cursor-pointer">
              {t.home}
            </div>
            <div
              onClick={() => {
                Router.push("/products");
              }}
              className="hover:cursor-pointer">
              {t.products}
            </div>
            <div
              onClick={() => {
                Router.push("/contact");
              }}
              className="hover:cursor-pointer">
              {t.contact}
            </div>
            <div
              onClick={() => {
                Router.push("/blogs");
              }}
              className="hover:cursor-pointer">
              {t.blogs}
            </div>
            <div
              onClick={() => {
                Router.push("/faq");
              }}
              className="hover:cursor-pointer">
              {t.faq}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-[8px] flex justify-around">
        &copy; Agro-Tech 2022. All right reserved.
      </div>
      <div className="hidden">
        <div className="home-bar">{t.home}</div>
        <div className="message-bar">{t.message}</div>
        <div className="cart-bar">{t.cart}</div>
        <div className="profile-bar">{t.profile}</div>
      </div>
    </div>
  );
};

export default Footer;
