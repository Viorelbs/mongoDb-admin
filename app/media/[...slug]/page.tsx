"use client";
import { Button } from "@material-tailwind/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function Folder({ params }: Params) {
  console.log(params);
  return (
    <div>
      <div className="flex justify-between items-center sticky top-0 z-50 py-4 border-b border-gray-600 !mt-0 bg-custom-gray">
        <div>
          <h1 className="font-bold">Folder name</h1>
        </div>

        <div className="flex gap-4 ">
          <Button variant="outlined" color="red" size="sm">
            Delete Folder
          </Button>
        </div>
      </div>
    </div>
  );
}
