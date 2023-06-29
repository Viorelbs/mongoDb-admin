"use client";
import Image from "next/image";
import folderIcon from "../../../public/icons/folderIcon.svg";
import { useRouter } from "next/navigation";

export default function FolderCard() {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => router.push("/media/test")}>
      <Image src={folderIcon} alt="folderIcon" width={100} height={100} />
      <span>Folder Name</span>
    </div>
  );
}
