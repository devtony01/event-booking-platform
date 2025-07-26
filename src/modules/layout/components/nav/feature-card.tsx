import * as React from 'react';
import { CardProps } from './types';

export const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex overflow-hidden flex-col grow shrink pt-9 pr-11 pb-8 pl-7 bg-white rounded-xl min-w-[240px] w-[316px] max-md:px-5">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain w-8 aspect-square"
      />
      <div className="mt-7 text-lg font-bold leading-none text-black">
        {title}
      </div>
      <div className="mt-7 text-base leading-6 text-stone-500">
        {description}
      </div>
    </div>
  );
};