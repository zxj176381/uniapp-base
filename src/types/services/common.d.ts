export declare global {
  declare interface AliyunOSSTSResult {
    securityToken: string;
    accessKeySecret: string;
    accessKeyId: string;
    expiration: string;
    domain: string;
    bucket: string;
    policy: string | null;
    signature: string | null;
    endpoint: string;
  }
}
