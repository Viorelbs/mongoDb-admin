"use client";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function getAllProducts() {
      await axios.get("api/products").then((response) => {
        setProducts(response.data);
      });
    }
    getAllProducts();
  }, []);

  console.log(products);

  return <h1>Product page</h1>;
}
