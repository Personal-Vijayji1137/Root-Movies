"use server"
import AWS from 'aws-sdk';
import { unstable_noStore as noStore } from 'next/cache';

const s3 = new AWS.S3({
    accessKeyId: process.env.ROOT_ACCESS_ID,
    secretAccessKey: process.env.ROOT_ACCESS_SECRET_KEY,
    region: process.env.ROOT_S3_REGION,
    signatureVersion: "v4",
    Expires: 7200
});
const BUCKET_NAME = "root-movies";
export default async function GeneratePresignedUrls(arrayOfKeys) {
    noStore();
    try {
        const urls = await Promise.all(
            arrayOfKeys.map(async ({ quality, key }) => {
                console.log(key);
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: key
                };
                const url = await s3.getSignedUrlPromise("getObject", params);
                return { quality, url };
            })
        );
        return urls;
    } catch (err) {
        return false;
    }
}