import Image from "next/image";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

interface Props {
  uploadedFiles: {
    url: string;
    name: string;
  }[];
  handleDelete: (name: string) => void;
}
export default function UploadImagesGrid({
  uploadedFiles,
  handleDelete,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto">
      {uploadedFiles.map((file) => (
        <div
          key={file.name}
          className="relative pt-[62.5%] border border-gray-500 rounded-md"
        >
          <TrashIcon
            onClick={() => handleDelete(file.name)}
            className="absolute bottom-0 right-0 w-9 h-9 z-10 bg-white rounded-tl-lg rounded-bl-lg text-red-900 p-2 cursor-pointer hover:bg-red-900 hover:text-white"
          />

          <Image
            src={file.url}
            width={100}
            height={100}
            alt="Preview"
            className="object-contain w-full h-full absolute top-0 left-0 p-3"
          />
        </div>
      ))}
    </div>
  );
}
