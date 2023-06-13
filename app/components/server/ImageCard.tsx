import React from "react";
import imageOne from "../../../public/media/pictureOne.png";
import imageTwo from "../../../public/media/Screenshot_60.png";
import imageThree from "../../../public/media/Screenshot_6.png";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";

import { Button } from "@material-tailwind/react";

export default function ImageCard() {
  return (
    <div className="p-3 bg-white w-fit rounded-lg">
      <Image
        src={imageTwo}
        alt="test"
        width={150}
        height={150}
        className="max-w-[150px] max-h-[150px] w-full h-full rounded-md"
      />
      <div className="mt-3 flex justify-between">
        <span className="text-sm text-ellipsis whitespace-nowrap overflow-hidden max-w-[120px] ">
          Poza de teste teste teste teste test
        </span>
        <button className="flex items-center gap-1">
          <TrashIcon className="grow w-4 h-4 text-red-700" />
        </button>
      </div>
    </div>
  );
}
