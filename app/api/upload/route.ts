import { s3 } from "@/lib/aws";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { body } = await req.json();

  const params = {
    Bucket: "epv-storage",
    Key: "Upload de test",
    Body: body,
  };

  await s3
    .upload(params, {
      partSize: 64 * 1024 * 1024,
    })
    .promise();

  return NextResponse.json({ message: "Object uploaded successfully" });
}
