import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  return new Response("hi");
}

export async function POST(req: Request) {
  await mongooseConnect();
  const data = await req.json();
  const { title, description } = data.body;
  6;
  const prod = await Product.create({ title, description });
  return NextResponse.json({ prod });
}
