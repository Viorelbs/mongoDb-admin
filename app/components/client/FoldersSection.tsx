"use client";
import React from "react";
import FolderCard from "./FolderCard";
import axios from "axios";
import { getFolders } from "@/app/media/mediaApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../server/Loader";
import { FolderInterface } from "@/typings";

export default function FoldersSection() {
  const { isLoading, data } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const { data } = await axios.get("api/media/folder");
      return data as FolderInterface[];
    },
  });

  return (
    <div>
      <h2 className="subtitle">Folders</h2>
      <div className="flex gap-8 flex-wrap">
        {isLoading ? (
          <Loader size={6} />
        ) : (
          data?.map((item: FolderInterface) => (
            <FolderCard key={item._id} title={item.title} />
          ))
        )}
      </div>
    </div>
  );
}
