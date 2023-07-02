"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import Loader from "../common/Loader";

interface Props {
  Button: React.ComponentType<any>;
  DynamicModal: React.ComponentType<any>;
}

export default function ModalHandler({ Button, DynamicModal }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button handleOpen={handleOpen} />
      {open ? <DynamicModal handleOpen={handleOpen} open={open} /> : null}
    </>
  );
}
