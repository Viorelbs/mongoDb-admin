"use client";
import axios from "axios";
import { useState } from "react";
import UploadBtn from "../components/client/UploadBtn";
import ImageCard from "../components/server/ImageCard";
import dynamic from "next/dynamic";
import Loader from "../components/server/Loader";
import { useQuery } from "@tanstack/react-query";
import { StorageObjectInterface } from "@/typings";

const DynamicModal = dynamic(
  () => import("../components/client/UploadFileModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: false,
  }
);
export default function MediaPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // Querying images from storage
  const { isLoading, data } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const { data } = await axios.get("api/upload");
      return data as StorageObjectInterface[];
    },
  });

  console.log(data);

  return (
    <div>
      {open ? <DynamicModal handleOpen={handleOpen} open={open} /> : null}
      <div className="flex justify-between items-center py-4 border-b border-gray-600 mb-8">
        <h1 className="font-bold">File Manager</h1>
        <div>
          <UploadBtn handleOpen={handleOpen} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {isLoading ? (
          <Loader size={6} />
        ) : (
          data?.map((object) => (
            <ImageCard key={object.objectsData.ETag} src={object.url} />
          ))
        )}
      </div>
    </div>
  );
}
