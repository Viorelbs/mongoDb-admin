"use client";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState<string | null>();

  useEffect(() => {
    async function getAllProducts() {
      await axios.get("api/products").then((response) => {
        setProducts(response.data);
      });
    }
    getAllProducts();
  }, []);

  const uploadFile = async () => {
    await axios.post("api/upload", { body: imagePreview });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    // if (e.target.files && e.target.files[0].size > 1000000) {
    //   alert("Size must be lower than 1mb");
    //   return;
    // }
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      const image = readerEvent.target?.result as string;
      setImagePreview(image);
    };
  };

  return (
    <div>
      {imagePreview && (
        <Image
          src={imagePreview}
          width={100}
          height={100}
          alt="Preview"
          className="object-contain w-full h-full max-w-[40vw]"
        />
      )}
      <form className="flex flex-col w-fit gap-4 ">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Button type="button" onClick={uploadFile}>
          Upload Image
        </Button>
      </form>
    </div>
  );
}
