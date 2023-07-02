"use client";
import React from "react";
import FolderCard from "./FolderCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { FolderInterface } from "@/typings";

interface Props {
  folders: FolderInterface[];
}
export default function FoldersSection({ folders }: Props) {
  return (
    <div>
      <h2 className="subtitle">Folders</h2>
      <div className="flex gap-8 flex-wrap">
        {folders.map((item: FolderInterface) => (
          <FolderCard key={item._id} title={item.title} />
        ))}
      </div>
    </div>
  );
}
