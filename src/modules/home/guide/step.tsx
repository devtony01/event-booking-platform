import * as React from 'react';
import { StepProps } from './types';

export const Step: React.FC<StepProps> = ({ number, title, description }) => {
    return (
        <div className="flex gap-5 justify-between items-start w-full max-md:mt-10 max-md:max-w-full max-sm:pl-5">
            <div className="flex items-center overflow-hidden px-6 w-14 h-14 font-semibold text-black whitespace-nowrap bg-zinc-100 rounded-[1000px] max-md:px-5">
                {number}
            </div>
            <div className="flex flex-col min-w-[240px] w-[428px] max-md:max-w-full">
                <div className="self-start text-black">{title}</div>
                <div className="mt-5 mr-0 leading-6 text-stone-500 max-md:max-w-full">
                    {description}
                </div>
            </div>
        </div>
    );
};