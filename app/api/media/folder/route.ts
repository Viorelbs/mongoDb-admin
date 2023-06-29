import { mongooseConnect } from "@/lib/mongoose";
import { Folders } from "@/models/Folder";
import { NextResponse } from "next/server";

export async function GET(res: Response) {
  await mongooseConnect();
  const items = await Folders.find();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { body } = await req.json();
  await mongooseConnect();
  await Folders.create({ title: body.title });
  return NextResponse.json({ message: "Folder created!" });
}

export async function PATCH(req: Request) {
  const { body } = await req.json();
  await mongooseConnect();

  await Folders.deleteOne({ title: body.title });
  return NextResponse.json({ message: "Folder deleted!" });
}
