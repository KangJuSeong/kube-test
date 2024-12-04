import express from "express";
import bodyParser from "body-parser";
import os from 'os';

import { S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand  } from "@aws-sdk/client-s3";

const app = express();

const BUCKET = process.env.BUCKET;
const OBJECTKEY = process.env.OBJECTKEY;

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  
 res.status(200).send(`
   <div>
    <h1>nodeapp-s3</h1>
    <h2> Version: 2.0.0 </h2>
    <h2> 호스트명 : ${os.hostname()} </h2>
  </div>
 `)
});

app.get("/contacts", async (req, res, next) => {
 const s3Client = new S3Client({ region: "ap-northeast-2" });
 const bucketParams = { Bucket: BUCKET, Key:OBJECTKEY };
 
 try {
  const streamToString = (stream) =>
    new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });

  const data = await s3Client.send(new GetObjectCommand(bucketParams));
  const bodyContents = await streamToString(data.Body);
  res.json(bodyContents);
 } catch (err) {
   console.log("Error", err);
   res.json({ error : err.message });
 }
})


app.listen(8080, () => {
  console.log(`Server is running : PORT 80`);
});