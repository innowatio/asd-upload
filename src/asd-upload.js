import {S3} from "aws-sdk";
import s3 from "s3";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const S3_BUCKET = process.env.S3_BUCKET;
const APP_DOMAIN = process.env.APP_DOMAIN;
const APP_STAGE = process.env.APP_DOMAIN;
const APP_SOURCE_DIR = process.argv[2];

const s3Client = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

s3Client.getBucketLocation({Bucket: S3_BUCKET}, (err, res) => {
    s3
        .createClient({
            s3Options: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
                region: res.LocationConstraint
            }
        })
        .uploadDir({
            localDir: APP_SOURCE_DIR,
            s3Params: {
                Bucket: S3_BUCKET,
                Prefix: `/${APP_DOMAIN}/${APP_STAGE}`
            }
        })
        .on("end", () => {
            console.log("Uploaded succeeded");
        });
});
