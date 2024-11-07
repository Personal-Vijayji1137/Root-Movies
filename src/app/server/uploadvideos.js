"use server"
import AWS from 'aws-sdk';
import { unstable_noStore as noStore } from 'next/cache';
import { Root_Movies_DB } from '../layout';
const s3 = new AWS.S3({
    accessKeyId: process.env.ROOT_ACCESS_ID,
    secretAccessKey: process.env.ROOT_ACCESS_SECRET_KEY,
    region: process.env.ROOT_S3_REGION,
    signatureVersion: "v4",
});
const BUCKET_NAME = "root-movies";
export default async function UploadVideosToS3(movie, format, id) {
    noStore();
    try {
        const fileName = `${movie.split(" ").join("-")}/${format}.mp4`
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Expires: 10800,
            ACL: "bucket-owner-full-control",
        };
        let url = await s3.getSignedUrlPromise("putObject", params);
        await Root_Movies_DB(
            `INSERT INTO movie_links (movie_id, url, quality) VALUES (?, ?, ?)`,
            [id, fileName, format]
        );
        return { fileName, url }
    } catch (err) {
        return { type: 'error', err: err };
    }
}
export async function UploadVideosToS3m3u8(fileName, format, id, url) {
    noStore();
    try {
        const postData = {
            image_url: url,
            bucket_name: BUCKET_NAME,
            s3_key: fileName, 
            access_id: process.env.ROOT_ACCESS_ID,
            secret_access_key: process.env.ROOT_ACCESS_SECRET_KEY,
            region_name: process.env.ROOT_S3_REGION
        }
        fetch('https://iplustsolution-uploadmovie.hf.space/download-and-upload-m3u8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        await Root_Movies_DB(
            `INSERT INTO movie_links (movie_id, url, quality) VALUES (?, ?, ?)`,
            [id, fileName, format]
        );
        return { fileName }
    } catch (err) {
        return { type: 'error', err: err };
    }
}