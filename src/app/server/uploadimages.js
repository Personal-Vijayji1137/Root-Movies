"use server"
import AWS from 'aws-sdk';
import axios from 'axios';
import {fileTypeFromStream} from 'file-type';
AWS.config.update({
    accessKeyId: process.env.ROOT_ACCESS_ID,
    secretAccessKey: process.env.ROOT_ACCESS_SECRET_KEY,
    region: process.env.ROOT_S3_REGION
});
const s3 = new AWS.S3();
const BUCKET_NAME = "root-movies-images";
async function uploadAttachmentToS3(type, buffer) {
    const currentTime = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const params = {
        Key: `${currentTime}.jpg`,
        Body: buffer,
        Bucket: BUCKET_NAME,
        ContentType: type,
    };
    return s3.upload(params).promise().then((response) => {
        return response.Key;
    }, (err) => {
        return { type: 'error', err: err };
    });
}
export default async function UploadImageToS3(url) {    
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'base64');
        const fileTypeResponse = await fetch(url);
        const fileType = await fileTypeFromStream(fileTypeResponse.body);
        return uploadAttachmentToS3(fileType.mime, buffer);
    } catch (err) {
        return { type: 'error', err: err };
    }
}