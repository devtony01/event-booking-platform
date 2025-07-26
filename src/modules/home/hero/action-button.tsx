import * as React from 'react';
import { ButtonProps } from './types';

export const ActionButton: React.FC<ButtonProps> = ({ text, variant, imageSrc }) => {
    const textColorClass = variant === 'primary' ? 'text-white' : 'text-green-800';

    return (
        <button
            className={`flex relative flex-col justify-center py-3 pr-8 pl-8 ${textColorClass} min-h-[48px] w-[226px] max-md:px-5`}
            type="button"
        >
            <img
                loading="lazy"
                src={imageSrc}
                alt=""
                className="object-contain absolute inset-0 z-0 max-w-full aspect-[4.72] w-[226px]"
            />
            <span className="self-center max-w-full rounded-none w-[165px]">
                {text}
            </span>
        </button>
    );
};