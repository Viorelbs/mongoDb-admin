import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  await mongooseConnect();
  const data = await req.json();
  const { title, description } = data.body;
  6;
  const prod = await Product.create({ title, description });
  return NextResponse.json({ prod });
}

export async function GET(req: Request) {
  await mongooseConnect();
  const products = await Product.find();
  return NextResponse.json({ products });
}
