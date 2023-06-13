import S3 from "aws-sdk/clients/s3";

const accessKeyId = process.env.NEXT_PUBLIC_ACCES_KEY;
const secretAccessKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

export const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  httpOptions: { timeout: 0 },
});
