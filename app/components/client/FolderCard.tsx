"use client";
import Image from "next/image";
import folderIcon from "../../../public/icons/folderIcon.svg";
import { useRouter } from "next/navigation";
import { titleToSlug } from "@/services/slugMaker";

interface Props {
  title: string;
}
export default function FolderCard({ title }: Props) {
  const router = useRouter();

  const slug = titleToSlug(title);

  return (
    <div
      className="cursor-pointer max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap "
      onClick={() => router.push(`/media/${slug}`)}
    >
      <Image
        src={folderIcon}
        alt="folderIcon"
        width={100}
        height={100}
        className="mx-auto"
      />
      <span className="text-sm">{title}</span>
    </div>
  );
}
