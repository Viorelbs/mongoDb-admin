import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@material-tailwind/react";

interface Props {
  src: string;
}
export default function ImageCard({ src }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="px-2 pb-3 bg-white rounded-lg relative">
      <Checkbox
        color={checked ? "red" : "blue"}
        onClick={() => setChecked(!checked)}
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
        <span className="text-sm text-gray-600 ">
          Poza de teste teste teste teste test
        </span>
        <button className="flex items-center gap-1"></button>
      </div>
    </div>
  );
}
