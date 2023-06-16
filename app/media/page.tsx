"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import UploadBtn from "../components/client/UploadBtn";
import ImageCard from "../components/server/ImageCard";
import dynamic from "next/dynamic";
import Loader from "../components/server/Loader";
import { useQuery } from "@tanstack/react-query";
import { StorageObjectInterface } from "@/typings";
import MediaButtons from "../components/client/MediaButtons";
import { Toaster, toast } from "react-hot-toast";
import { deleteMedia } from "./mediaApi";
import {
  deleteObjects,
  handleChecked,
  handleCheckedAll,
} from "./MediaHandlers";

const DynamicModal = dynamic(
  () => import("../components/client/UploadFileModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: false,
  }
);
export default function MediaPage() {
  const [checked, setChecked] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);
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

  const handleCheckedWrapper = (name: string) =>
    handleChecked(name, checked, setChecked);
  const deleteObjectsWrapper = deleteObjects(
    checked,
    deleteMedia,
    setChecked,
    setDeleted
  );
  const handleCheckedAllWrapper = handleCheckedAll(
    data || [],
    checkAll,
    setChecked,
    setCheckAll
  );

  // Making sure to check to set checkedall to false if the list is empty
  useEffect(() => {
    if (checked.length === 0) {
      setCheckAll(false);
    }
  }, [checked]);
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
          {checked?.length > 0 ? (
            <MediaButtons
              checkAll={checkAll}
              assetsNr={checked.length}
              deleteObjects={deleteObjectsWrapper}
              handleCheckedAll={handleCheckedAllWrapper}
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
              handleChecked={handleCheckedWrapper}
              isChecked={checked.includes(object.name) || false}
            />
          ))
        )}
      </div>
    </div>
  );
}
