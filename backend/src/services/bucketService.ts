import { env } from "@/config/env";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class BucketService {
  private s3: S3Client;
  private bucket: string;

  constructor() {
    this.s3 = new S3Client({
      endpoint: "https://s3.twcstorage.ru",
      forcePathStyle: true,
      region: "ru-1",
      apiVersion: "latest",
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_KEY,
      },
    });

    this.bucket = env.S3_BUCKET;
  }

  async uploadFile(
    buffer: Buffer,
    key: string,
    contentType: string,
  ): Promise<string> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ACL: "public-read",
      }),
    );

    return this._buildUrl(key);
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  getFileUrl(key: string): string {
    return this._buildUrl(key);
  }

  async getPresignedUrl(key: string, expiresIn: 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return getSignedUrl(this.s3, command, { expiresIn });
  }

  private _buildUrl(key: string) {
    return `https://${this.bucket}.s3.twcstorage.ru/${key}`;
  }
}

const bucketService = new BucketService();

export { bucketService };
