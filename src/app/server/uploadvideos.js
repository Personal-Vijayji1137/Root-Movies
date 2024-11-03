"use server"
import AWS from 'aws-sdk';
import axios from 'axios';
import { Root_Movies_DB } from '../layout';
const s3 = new AWS.S3({
    accessKeyId: process.env.ROOT_ACCESS_ID,
    secretAccessKey: process.env.ROOT_ACCESS_SECRET_KEY,
    region: process.env.ROOT_S3_REGION,
    signatureVersion: "v4",
});
const BUCKET_NAME = "root-movies";
export default async function UploadVideosToS3(video_url, movie, format, id) {
    try {
        const fileName = `${movie.split(" ").join("-")}/${format}.mp4`
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Expires: 10800,
            ACL: "bucket-owner-full-control",
        };
        let url = await s3.getSignedUrlPromise("putObject", params);
        const postData = {
            video_url: video_url,
            upload_url: url,
        };
        await axios.post('https://iplustsolution-uploadmovie.hf.space/upload-movies', postData);
        await Root_Movies_DB(
            `INSERT INTO movie_links (movie_id, url, quality) VALUES (?, ?, ?)`,
            [id, fileName, format]
        );
        return { fileName }
    } catch (err) {
        console.log(err);
        return { type: 'error', err: err };
    }
}