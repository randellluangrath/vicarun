// import {Storage} from '@google-cloud/storage';
// import fs from 'fs';
// import path from 'path';
// import formidable from "formidable";
//
// const storage = new Storage({
//     projectId: process.env.GOOGLE_CLOUD_PROJECT,
//     keyFilename: path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS!),
// });
//
// const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);
//
// export const uploadFileToStorage = (file: formidable.File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         const blob = bucket.file(file.originalFilename as string);
//         const blobStream = blob.createWriteStream({
//             resumable: false,
//         });
//
//         blobStream.on('error', (err) => {
//             reject(err);
//         });
//
//         blobStream.on('finish', () => {
//             const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//             resolve(publicUrl);
//         });
//
//         fs.createReadStream(file.filepath).pipe(blobStream);
//     });
// };
