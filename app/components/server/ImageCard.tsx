import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@material-tailwind/react";
import Loader from "./Loader";

interface Props {
  src: string;
  name: string;
  handleChecked: (id: string) => void;
  deleted: string[];
  isChecked: boolean;
}
export default function ImageCard({
  src,
  name,
  handleChecked,
  deleted,
  isChecked,
}: Props) {
  const itsDeleted = deleted.includes(name);
  return (
    <div className="px-2 pb-3 bg-white rounded-lg relative">
      {itsDeleted ? (
        <div className="absolute bg-white/60 w-full h-full top-0 left-0 z-50 grid place-content-center">
          <Loader size={6} />
        </div>
      ) : null}
      <Checkbox
        color="red"
        id={name}
        checked={isChecked}
        onClick={() => handleChecked(name)}
      />
      <div className="relative pt-[62.5%]">
        <Image
          src={src}
          alt="test"
          width={150}
          height={150}
          className="w-full h-full object-contain absolute top-0 left-0"
        />
      </div>
      <div className="mt-3 flex justify-between  pt-2 border-t border-gray-400">
        <span className="text-sm text-gray-600 overflow-hidden text-ellipsis">
          {name}
        </span>
        <button className="flex items-center gap-1"></button>
      </div>
    </div>
  );
}
