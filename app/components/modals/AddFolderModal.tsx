"use client";
import { Button, Dialog, Input } from "@material-tailwind/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Loader from "../common/Loader";
import { FormValidator } from "@/services/formValidator";
import { createFolder } from "@/app/media/mediaApi";

interface Props {
  handleOpen: () => void;
  open: boolean;
}

export default function AddFolderModal({ handleOpen, open }: Props) {
  const [value, setValue] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (value.length !== 0) {
      window.confirm("Are you sure you want to close modal?") && handleOpen();
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    validator(value);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    validator(e.target.value);
  };

  //   Validator
  const validator = (value: string) => {
    setErrors([]);

    const validationErrors: string[] = [];

    const minLengthError = FormValidator.min(value, 3);
    if (minLengthError) {
      validationErrors.push(minLengthError);
    }

    const maxLengthError = FormValidator.max(value, 20);
    if (maxLengthError) {
      validationErrors.push(maxLengthError);
    }

    setErrors(validationErrors);
  };

  const handleCreateFolder = async () => {
    setLoading(true);
    await createFolder(value);
    toast.success("Your folder has been created!", { duration: 2500 });
    setLoading(false);
    handleOpen();
  };

  return (
    <Dialog
      size="md"
      open={open}
      handler={handleClose}
      className="bg-white p-6 shadow-none"
    >
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            maxWidth: "700px",
          },
        }}
      />
      {loading ? (
        <Loader size={6} />
      ) : (
        <form className="flex flex-col gap-4 ">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-black text-lg">Add folder</h4>
            <XMarkIcon
              onClick={handleClose}
              className="h-5 w-5 cursor-pointer hover:text-red-600"
            />
          </div>
          <div className="space-y-4">
            <Input value={value} onChange={handleChange} label="Folder Name" />

            {errors.map((error, index) => (
              <p key={index} className="text-red-500 text-sm">
                {error}
              </p>
            ))}

            {errors.length === 0 && (
              <Button type="submit" onClick={handleCreateFolder}>
                Create Folder
              </Button>
            )}
          </div>
        </form>
      )}
    </Dialog>
  );
}
