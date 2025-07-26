import * as React from 'react';
import Link from 'next/link';
import { ButtonLinkProps } from './types';

export const ButtonLink: React.FC<ButtonLinkProps> = ({ variant, href, children }) => {
  const baseStyles = "overflow-hidden gap-2.5 self-stretch py-[8px] text-center transition-colors duration-200";
  const variantStyles = {
    primary: "px-12 text-white bg-green-800 hover:bg-green-900 rounded max-md:px-5",
    secondary: "px-9 text-green-800 bg-white hover:bg-green-50 rounded border-2 border-green-800 border-solid max-md:px-5"
  };

  return (
    <Link 
      href={href}
      className={`${baseStyles} ${variantStyles[variant]}`}
      role="button"
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Link>
  );
};