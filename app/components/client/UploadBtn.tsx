"use client";
import { Button } from "@material-tailwind/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

interface Props {
  handleOpen: () => void;
}
export default function UploadBtn({ handleOpen }: Props) {
  return (
    <Button
      className="flex gap-2 whitespace-nowrap items-center"
      onClick={handleOpen}
    >
      <CloudArrowUpIcon className="w-6 h-6" />
      Upload file
    </Button>
  );
}
