import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Props {
  logout: () => void;
}
export default function LogoutBtn({ logout }: Props) {
  return (
    <ListItem onClick={logout}>
      <ListItemPrefix>
        <PowerIcon className="h-5 w-5" />
      </ListItemPrefix>
      Log Out
    </ListItem>
  );
}
