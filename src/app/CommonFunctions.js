"use server"
import { Buffer } from 'buffer';
import { Root_Movies_DB } from './layout';
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
export async function toggleSwitch(is_published,movie_id){
  await Root_Movies_DB(`
      UPDATE movie
      SET is_published = ?
      WHERE movie_id = ?;
    `, [is_published, movie_id]);
    return true
};