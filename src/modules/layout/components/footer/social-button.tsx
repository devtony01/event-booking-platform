import * as React from "react";
import { SocialButtonProps } from "./types";

export const SocialButton: React.FC<SocialButtonProps> = ({ icon, alt, onClick }) => (
    <button
        className="flex gap-2.5 items-center self-stretch px-5 py-4 my-auto bg-white h-[50px] rounded-[1000px] w-[50px]"
        onClick={onClick}
        aria-label={alt}
    >
        <img
            loading="lazy"
            src={icon}
            alt={alt}
            className="object-contain self-stretch my-auto w-3.5 aspect-[0.87]"
        />
    </button>
);