import { Avatar, Typography } from "@material-tailwind/react";
import React from "react";

interface Props {
  image: string;
  name: string;
}
export default function AvatarInfo({ image, name }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Avatar src={image} alt="user avatar" />
      <div>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Admin
        </Typography>
      </div>
    </div>
  );
}
