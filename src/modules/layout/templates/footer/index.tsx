"use client"

import * as React from "react";
import { AddressBlock } from "../../components/footer/address-block";
import { ContactItem } from "../../components/footer/contact-item";
import { SocialButton } from "../../components/footer/social-button";

const Footer = () => {
  const navigationItems = {
    title: "How it works",
    items: ["About", "Info"]
  };

  const contactItems = {
    title: "Contact us",
    items: ["0800-125-500-6266", "info@abcd.com.ng"]
  };

  return (
    <div className="flex flex-col px-28 pt-16 pb-24 bg-green-800 max-md:px-5 max-md:pb-24 max-sm:gap-5">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="flex shrink-0 h-px bg-zinc-100 bg-opacity-20 max-md:max-w-full" />
      </div>
      <div className="flex flex-wrap justify-between items-end mt-7 w-full max-md:max-w-full max-sm:gap-5">
        <AddressBlock address="123 Maple Street, Springfield, IL 62704, Lagos" />
        <div className="flex gap-10 items-center min-w-[240px] max-md:max-w-full max-sm:flex max-sm:flex-col">
          <ContactItem {...navigationItems} />
          <ContactItem {...contactItems} />
          <SocialButton
            icon="svg/arrow-up.svg"
            alt="Social media link"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;