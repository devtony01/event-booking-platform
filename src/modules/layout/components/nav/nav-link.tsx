import * as React from 'react';
import Link from 'next/link';
import { NavLinkProps } from './types';

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link 
      href={href}
      className="self-stretch my-auto whitespace-nowrap rounded-none hover:text-green-800 transition-colors duration-200"
    >
      {children}
    </Link>
  );
};