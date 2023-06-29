"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import UploadBtn from "../components/client/UploadBtn";
import ImageCard from "../components/ImageCard";
import dynamic from "next/dynamic";
import Loader from "../components/server/Loader";
import { useQuery } from "@tanstack/react-query";
import { StorageObjectInterface } from "@/typings";
import MediaButtons from "../components/client/MediaButtons";
import { Toaster } from "react-hot-toast";
import { deleteMedia } from "./mediaApi";
import {
  deleteObjects,
  handleChecked,
  handleCheckedAll,
} from "./MediaHandlers";
import FolderCard from "../components/client/FolderCard";
import AddFolderBtn from "../components/client/AddFolderBtn";
import ModalHandler from "../components/client/ModalHandler";
import FoldersSection from "../components/client/FoldersSection";

const DynamicUploadFileModal = dynamic(
  () => import("../components/client/UploadFileModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: false,
  }
);

const DynamicAddFolderModal = dynamic(
  () => import("../components/client/AddFolderModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: false,
  }
);

export default function MediaPage() {
  const [checked, setChecked] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [deleted, setDeleted] = useState<any[]>([]);

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
    <div className="space-y-10">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            maxWidth: "700px",
          },
        }}
      />
      <div className="flex justify-between items-center sticky top-0 z-50 py-4 border-b border-gray-600 !mt-0 bg-custom-gray">
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

        <div className="flex gap-4 ">
          <ModalHandler
            Button={UploadBtn}
            DynamicModal={DynamicUploadFileModal}
          />
          <ModalHandler
            Button={AddFolderBtn}
            DynamicModal={DynamicAddFolderModal}
          />
        </div>
      </div>
      <FoldersSection />
      <div>
        <h2 className="subtitle">Images</h2>
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
    </div>
  );
}
