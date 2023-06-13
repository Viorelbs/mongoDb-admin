"use client";

import React from "react";
import axios from "axios";
import { Button, Dialog } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  handleOpen: () => void;
  open: boolean;
}

export default function UploadFileModal({ handleOpen, open }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>();

  const uploadFile = async () => {
    await axios.post("api/upload", { body: imagePreview });
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0].size > 5000000) {
      alert("Size must be lower than 5mb");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      const image = readerEvent.target?.result as string;
      setImagePreview(image);
    };
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-white p-6 shadow-none"
    >
      {imagePreview && (
        <Image
          src={imagePreview}
          width={100}
          height={100}
          alt="Preview"
          className="object-contain w-full h-full max-w-[40vw]"
        />
      )}
      <form className="flex flex-col w-fit gap-4 ">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Button type="button" onClick={uploadFile}>
          Upload Image
        </Button>
      </form>
    </Dialog>
  );
}
