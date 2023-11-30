import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

export const s3ListObjects$ = async (bucketName: string) => {
  const command = new ListObjectsCommand({ Bucket: bucketName });
  const { Contents } = await s3Client.send(command);

  if (!Contents || !Contents.length) throw new Error("Empty bucket");

  return Contents.map(({ Key }) => Key).filter(Boolean);
};
