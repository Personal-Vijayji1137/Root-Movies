"use server"
import { Buffer } from 'buffer';
export default async function RootGetCustomImagesURL(imgKey, width, height) {
  const imageRequest = JSON.stringify({
    bucket: process.env.ROOT_IMAGES_BUCKET_NAME,
    key: imgKey,
    edits: {
      resize: {
        width,
        height,
        fit: 'cover',
      },
    },
  });
  const encoded = Buffer.from(imageRequest).toString('base64');
  return `${process.env.ROOT_IMAGES_BASE_URL}/${encoded}`;
}