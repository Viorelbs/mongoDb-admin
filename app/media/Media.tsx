"use client";
import { useEffect, useState } from "react";
import AddFolderBtn from "../components/client/AddFolderBtn";
import ModalHandler from "../components/client/ModalHandler";
import FoldersSection from "../components/client/FoldersSection";
import Loader from "../components/common/Loader";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import MediaButtons from "../components/client/MediaButtons";
import UploadBtn from "../components/client/UploadBtn";
import { FolderInterface, StorageObjectInterface } from "@/typings";
import ImageCard from "../components/ImageCard";
import { deleteMedia } from "@/app/media/mediaApi";

const DynamicUploadFileModal = dynamic(
  () => import("../components/modals/UploadFileModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: false,
  }
);

const DynamicAddFolderModal = dynamic(
  () => import("../components/modals/AddFolderModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: false,
  }
);

interface Props {
  items: StorageObjectInterface[];
  folders: FolderInterface[];
}

export default function Media({ items, folders }: Props) {
  const [checked, setChecked] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [deleted, setDeleted] = useState<any[]>([]);

  // Filter checking
  const handleCheckedWrapper = (name: string) => {
    if (checked.includes(name)) {
      setChecked(checked.filter((file) => file !== name));
    } else {
      setChecked((prev: string[]) => [...prev, name]);
    }
  };

  // Deleting objects
  const deleteObjectsWrapper = async () => {
    if (window.confirm("Are you sure you want to delete these assets?")) {
      await deleteMedia(checked);
      setChecked([]);
      setDeleted(checked);
      toast.error("Your files have been deleted", {
        duration: 2500,
      });
    }
  };

  // Checking all boxes
  const handleCheckedAllWrapper = () => {
    if (checkAll) {
      setChecked([]);
    } else {
      const allNames = items.map(
        (object: StorageObjectInterface) => object.name
      );
      setChecked(allNames);
    }
    setCheckAll(!checkAll);
  };

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
      <FoldersSection folders={folders} />
      <div>
        <h2 className="subtitle">Images</h2>
        <div className="grid grid-cols-4 gap-4">
          {items?.map((object: StorageObjectInterface) => (
            <ImageCard
              key={object.name}
              src={object.url}
              deleted={deleted}
              name={object.name}
              handleChecked={handleCheckedWrapper}
              isChecked={checked.includes(object.name) || false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
