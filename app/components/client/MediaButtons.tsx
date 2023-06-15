"use client";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

interface Props {
  assetsNr: number;
  deleteObjects: () => void;
}

export default function MediaButtons({ assetsNr, deleteObjects }: Props) {
  return (
    <div className="mt-2 flex gap-4 items-center">
      <span className="text-gray-600">
        {assetsNr} {assetsNr === 1 ? "asset" : "assets"}
      </span>
      <button
        onClick={deleteObjects}
        className="bg-red-100/50 py-2 px-4 font-semibold rounded-md text-sm text-deep-orange-900 flex items-center gap-2 hover:bg-red-900 hover:text-white"
      >
        <TrashIcon className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
}
