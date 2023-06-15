"use client";

import React from "react";
import axios from "axios";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Dialog } from "@material-tailwind/react";
import { ChangeEvent, useState } from "react";
import UploadImagesGrid from "./UploadImagesGrid";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../server/Loader";

interface Props {
  handleOpen: () => void;
  open: boolean;
}

export default function UploadFileModal({ handleOpen, open }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (name: string) => {
    const filteredFiles = uploadedFiles.filter((item) => item.name !== name);
    setUploadedFiles(filteredFiles);
  };

  // Uploading files
  const uploadFile = async () => {
    setIsLoading(true);
    await axios.post("api/media", { body: uploadedFiles });
    setIsLoading(false);
    setUploadedFiles([]);
    toast.success("Your assets has been uploaded!", { duration: 2500 });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as ArrayLike<File>);

    files.forEach((file) => {
      if (file.size > 5000000) {
        alert("Size must be lower than 5mb");
        return;
      }
      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const image = readerEvent.target?.result as string;
        setUploadedFiles((prev) => [...prev, { name: file.name, url: image }]);
      };

      reader.readAsDataURL(file);
    });
  };

  // Making sure to add confirmation if there is any image to uploads
  const handleClose = () => {
    if (uploadedFiles.length !== 0) {
      window.confirm("Are you sure you want to cancel the upload?") &&
        handleOpen();
    } else {
      handleOpen();
    }
  };

  return (
    <Dialog
      size="xl"
      open={open}
      handler={uploadedFiles.length === 0 ? handleOpen : handleClose}
      className="bg-white p-6 shadow-none "
    >
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            maxWidth: "700px",
          },
        }}
      />
      <form className="flex flex-col gap-4 ">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Add more assets</h4>
          <XMarkIcon
            onClick={handleClose}
            className="h-5 w-5 cursor-pointer hover:text-red-600"
          />
        </div>

        {uploadedFiles.length !== 0 ? (
          <UploadImagesGrid
            uploadedFiles={uploadedFiles}
            handleDelete={handleDelete}
          />
        ) : (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudArrowUpIcon className="w-14 h-14 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG or JPG (max 1mb)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              multiple
              accept=".png, .svg, .jpg"
              required
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}

        {uploadedFiles.length !== 0 ? (
          <div className="flex justify-between items-center">
            <Button
              variant="outlined"
              color="red"
              size="sm"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="button" onClick={uploadFile}>
              Upload assets
            </Button>
          </div>
        ) : null}
        {isLoading ? (
          <div className="absolute top-0 left-0 w-full h-full z-50 grid place-content-center bg-white/70">
            <Loader size={9} />
          </div>
        ) : null}
      </form>
    </Dialog>
  );
}
