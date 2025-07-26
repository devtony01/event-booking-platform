import * as React from 'react';
import { TabProps } from './types';

export const Tab: React.FC<TabProps> = ({ label, isActive }) => {
    return (
        <div className={`self-stretch my-auto ${isActive ? 'overflow-hidden shrink self-stretch px-14 py-2.5 my-auto w-auto text-lg leading-none text-green-800 bg-white rounded-2xl max-md:px-5 max-sm:self-center max-sm:w-auto max-sm:h-auto' : ''}`}>
            {label}
        </div>
    );
};