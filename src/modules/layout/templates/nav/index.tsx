import * as React from "react";
import { NavLink } from "../../components/nav/nav-link";
import { ButtonLink } from "../../components/nav/hero-button";

const Nav = () => {
  return (
    <nav className="flex flex-col justify-center px-28 py-2 w-full text-base bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="flex gap-10 items-center self-stretch my-auto text-black min-w-[240px]">
          <img
            loading="lazy"
            src="images/logo.png"
            alt="Company Logo"
            className="object-contain shrink-0 self-stretch my-auto aspect-[2.25] w-[63px]"
          />
          <div className="flex gap-10 items-center self-stretch my-auto">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/how-it-works">How it works</NavLink>
          </div>
        </div>
        <div className="flex gap-5 items-end self-stretch my-auto whitespace-nowrap min-w-[240px]">
          <ButtonLink variant="primary" href="/account">Register</ButtonLink>
          <ButtonLink variant="secondary" href="/account">Login</ButtonLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;