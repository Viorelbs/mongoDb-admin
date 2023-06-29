"use client";
import { Button } from "@material-tailwind/react";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Props {
  handleOpen: () => void;
}

export default function AddFolderBtn({ handleOpen }: Props) {
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        className="flex gap-2 items-center "
      >
        <FolderPlusIcon className="w-6 h-6" />
        Add folder
      </Button>
    </>
  );
}
