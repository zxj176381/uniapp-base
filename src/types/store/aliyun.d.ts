export declare global {
  declare interface UploadFileListOptions {
    filePathList: string[];
    fileDir: string;
    fileType: string;
    progress?: ({ filePath, pro }: { filePath: string; pro: number }) => void;
  }

  declare interface UploadOSSSuccess {
    tempFilePath: string;
    ossPath: string;
  }

  declare interface AliyunOSSTSResultIF {
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

  declare interface UploadFileOptions {
    filePath: string;
    fileDir: string;
    fileType: string;
    ossts: AliyunOSSTSResultIF;
    success?: (successEvent: UploadOSSSuccess) => void;
    fail?: () => void;
    progress?: (pro: number) => void;
  }
  declare interface UploadFileNameOptions {
    filePath: string;
    fileDir: string;
    fileType: string;
  }
}
