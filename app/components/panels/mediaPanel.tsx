"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../common/Loader";
import MediaButtons from "../client/MediaButtons";
import ModalHandler from "../client/ModalHandler";
import UploadBtn from "../client/UploadBtn";
import AddFolderBtn from "../client/AddFolderBtn";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const DynamicUploadFileModal = dynamic(
  () => import("../modals/UploadFileModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: true,
  }
);

const DynamicAddFolderModal = dynamic(
  () => import("../modals/UploadFileModal"),
  {
    loading: () => <Loader size={6} />,
    ssr: true,
  }
);

export default function MediaPanel() {
  const [checked, setChecked] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [deleted, setDeleted] = useState<any[]>([]);
  const checkedList = useSelector((store: any) => store.mediaSlice.checkList);
  // console.log(checkedList);

  //   const handleCheckedWrapper = (name: string) =>
  //   handleChecked(name, checked, setChecked);
  // const deleteObjectsWrapper = deleteObjects(
  //   checked,
  //   deleteMedia,
  //   setChecked,
  //   setDeleted
  // );
  // const handleCheckedAllWrapper = handleCheckedAll(
  //   data || [],
  //   checkAll,
  //   setChecked,
  //   setCheckAll
  // );

  // // Making sure to check to set checkedall to false if the list is empty
  // useEffect(() => {
  //   if (checked.length === 0) {
  //     setCheckAll(false);
  //   }
  // }, [checked]);

  return (
    <div className="flex justify-between items-center sticky top-0 z-50 py-4 border-b border-gray-600 !mt-0 bg-custom-gray">
      <div>
        <h1 className="font-bold">File Manager</h1>
        {checkedList?.length > 0 ? (
          <MediaButtons checkAll={checkAll} assetsNr={checkedList.length} />
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
  );
}
