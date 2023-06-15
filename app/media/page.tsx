"use client";
import axios from "axios";
import { useState } from "react";
import UploadBtn from "../components/client/UploadBtn";
import ImageCard from "../components/server/ImageCard";
import dynamic from "next/dynamic";
import Loader from "../components/server/Loader";
import { useQuery } from "@tanstack/react-query";
import { StorageObjectInterface } from "@/typings";
import MediaButtons from "../components/client/MediaButtons";
import { Toaster, toast } from "react-hot-toast";

const DynamicModal = dynamic(
  () => import("../components/client/UploadFileModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: false,
  }
);
export default function MediaPage() {
  const [checked, setChecked] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // Querying images from storage
  const { isLoading, data } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const { data } = await axios.get("api/media");
      return data as StorageObjectInterface[];
    },
  });

  const handleChecked = (name: string) => {
    if (checked.includes(name)) {
      setChecked(checked.filter((file) => file !== name));
    } else {
      setChecked((prev) => [...prev, name]);
    }
  };

  const deleteObjects = async () => {
    await axios.patch("api/media", { body: checked });
    setChecked([]);
    setDeleted(checked);
    toast.error("Your files have been deleted", {
      duration: 2500,
    });
  };

  return (
    <div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            maxWidth: "700px",
          },
        }}
      />
      {open ? <DynamicModal handleOpen={handleOpen} open={open} /> : null}
      <div className="flex justify-between items-center py-4 border-b border-gray-600 mb-8">
        <div>
          <h1 className="font-bold">File Manager</h1>
          {checked.length > 0 ? (
            <MediaButtons
              assetsNr={checked.length}
              deleteObjects={deleteObjects}
            />
          ) : null}
        </div>
        <div>
          <UploadBtn handleOpen={handleOpen} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {isLoading ? (
          <Loader size={6} />
        ) : (
          data?.map((object: StorageObjectInterface) => (
            <ImageCard
              key={object.name}
              src={object.url}
              deleted={deleted}
              name={object.name}
              handleChecked={handleChecked}
            />
          ))
        )}
      </div>
    </div>
  );
}
