const S3 = require('aws-sdk/clients/s3.js');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});


const uploadFile = async (file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
        ContentType: file.mimetype,
        //   ACL: 'public-read',
    };
    return s3.upload(uploadParams).promise();
};

module.exports = { uploadFile };