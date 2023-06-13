"use client";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import UploadBtn from "../components/client/UploadBtn";
import ImageCard from "../components/server/ImageCard";
import dynamic from "next/dynamic";
import Loader from "../components/server/Loader";

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

  const [buckets, setBuckets] = useState();

  //   useEffect(() => {
  //     async function getBuckets() {
  //       const response = await axios.post("api/upload");
  //       setBuckets(response.data);
  //     }
  //     getBuckets();
  //   }, []);

  return (
    <div>
      {open ? <DynamicModal handleOpen={handleOpen} open={open} /> : null}
      <div className="flex justify-between items-center py-4 border-b border-gray-600 mb-8">
        <h1 className="font-bold">File Manager</h1>
        <div>
          <UploadBtn handleOpen={handleOpen} />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
    </div>
  );
}
