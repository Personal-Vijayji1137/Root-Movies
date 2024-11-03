"use server"
import AWS from 'aws-sdk';
import { unstable_noStore as noStore } from 'next/cache';
import axios from 'axios';
const s3 = new AWS.S3({
    accessKeyId: process.env.ROOT_ACCESS_ID,
    secretAccessKey: process.env.ROOT_ACCESS_SECRET_KEY,
    region: process.env.ROOT_S3_REGION,
    signatureVersion: "v4",
});
export default async function UploadImageToS3(image_url) {  
    noStore();  
    try {
        const currentTime = new Date().toISOString().replace(/[-:.TZ]/g, '');
        const fileName = `${currentTime}.jpg`
        const params = {
            Bucket: process.env.ROOT_IMAGES_BUCKET_NAME,
            Key: fileName,
            Expires: 100,
            ACL: "bucket-owner-full-control",
        };
        let url = await s3.getSignedUrlPromise("putObject", params);
        const postData = {
            image_url: image_url,
            upload_url: url,
        };
        try {
            const response = await axios.post('https://iplustsolution-uploadmovie.hf.space/upload-image', postData);
            return {fileName}
        } catch (error) {
            console.error('Error posting data:', error);
        }
    } catch (err) {
        return { type: 'error', err: err };
    }
}