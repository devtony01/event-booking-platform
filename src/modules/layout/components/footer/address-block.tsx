import * as React from "react";
import { AddressBlockProps } from "./types";

export const AddressBlock: React.FC<AddressBlockProps> = ({ address }) => (
  <div className="flex flex-col flex-1 shrink text-base text-white basis-0 min-w-[240px] max-md:max-w-full">
    <div className="max-md:max-w-full">Address</div>
    <div className="mt-5 max-md:max-w-full">{address}</div>
  </div>
);