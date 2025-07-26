import * as React from "react";
import { ContactItemProps } from "./types";

export const ContactItem: React.FC<ContactItemProps> = ({ title, items }) => (
    <div className="flex flex-col self-stretch my-auto text-base text-white">
        <div>{title}</div>
        {items.map((item, index) => (
            <div key={index} className="mt-6">
                {item}
            </div>
        ))}
    </div>
);