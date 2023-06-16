import { s3 } from "@/lib/aws";
import { mongooseConnect } from "@/lib/mongoose";
import { Media } from "@/models/Media";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
  const { body } = await req.json();

  const uploadPromises = body.map(
    async (obj: { url: string; name: string }) => {
      // Decode the Base64 image data
      const imageData = obj.url.split(",")[1];
      const decodedData = Buffer.from(imageData, "base64");

      // Create a readable stream from the decoded data
      const imageStream = new Readable();
      imageStream.push(decodedData);
      imageStream.push(null);

      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
        Key: obj.name,
        Body: imageStream,
      };

      await mongooseConnect();
      await Media.create({ title: obj.name });
      return s3
        .upload(params, {
          partSize: 64 * 1024 * 1024,
        })
        .promise();
    }
  );

  await Promise.all(uploadPromises);

  return NextResponse.json({ message: "Object uploaded successfully" });
}

export async function GET() {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
  };

  const objects = (await s3.listObjects(params).promise()) as any;
  // Looping to get all objets inside bucket
  const objectsData = await Promise.all(
    objects.Contents.map(async (object: any) => {
      const objectParams = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
        Key: object.Key,
      };

      const name = object.Key;
      // Getting url for each object
      const url = await s3.getSignedUrlPromise("getObject", objectParams);
      const objectsData = await s3.getObject(objectParams).promise();
      return { url, name };
    })
  );

  return NextResponse.json(objectsData);
}

export async function PATCH(req: Request) {
  const { body } = await req.json();

  const deleteObjects = body.map(async (name: string) => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
      Key: name,
    };
    return await s3.deleteObject(params).promise();
  });

  await mongooseConnect();
  await Media.deleteMany({ title: { $in: body } });
  return NextResponse.json(deleteObjects);
}
