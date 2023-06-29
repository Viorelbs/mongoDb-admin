import { mongooseConnect } from "@/lib/mongoose";
import { Folders } from "@/models/Folder";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  //   const { body } = await req.json();
  await mongooseConnect();

  //   console.log(body);
  await Folders.create({ title: "test" });

  return NextResponse.json({ message: "Folder created!" });
}

export async function PATCH(req: Request) {
  await mongooseConnect();

  await Folders.deleteOne({ title: "test" });
  return NextResponse.json({ message: "Folder deleted!" });
}
