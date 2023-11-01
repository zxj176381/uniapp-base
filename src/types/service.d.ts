export declare global {
  declare interface ServiceOptions {
    url?: string;
    path: string;
    query?: any;
    data?: any;
    header?: Record<string, string>;
    contentType?: "json" | "form";
    method?: "GET" | "POST" | "PUT" | "OPTIONS" | "HEAD" | "DELETE" | "TRACE" | "CONNECT" | undefined;
    withToken?: boolean;
    showDialog?: boolean;
  }

  declare interface ServiceResponse<R> {
    code: number;
    message: string;
    success: boolean;
    timestamp: number;
    result: R;
  }

  declare interface ServiceReturnResponse<R> extends ServiceResponse<R> {
    _status: number;
    _msg: string;
  }

  declare type ServicePromise<R> = Promise<ServiceReturnResponse<R>>;
  type Service1<R> = () => ServicePromise<R>;
  type Service2<R, D> = (data: D) => ServicePromise<R>;
  type Service3<R, D, Q> = (data: D, query: Q) => ServicePromise<R>;
  declare type Service<R, D = null, Q = null> = D extends null
    ? Service1<R>
    : Q extends null
    ? Service2<R, D>
    : Service3<R, D, Q>;

  declare interface ServiceListResult<T> {
    countId: number | null;
    current: number;
    maxLimit: number | null;
    optimizeCountSql: boolean;
    orders: [];
    pages: number;
    records: T;
    searchCount: boolean;
    size: number;
    total: number;
  }
  declare type ServiceRecordPromise<R> = Promise<ServiceReturnResponse<ServiceListResult<R>>>;
  type ServiceRecord1<R> = () => ServiceRecordPromise<R>;
  type ServiceRecord2<R, D> = (data: D) => ServiceRecordPromise<R>;
  type ServiceRecord3<R, D, Q> = (data: D, query: Q) => ServiceRecordPromise<R>;
  declare type ServiceRecord<R, D = null, Q = null> = D extends null
    ? ServiceRecord1<R>
    : Q extends null
    ? ServiceRecord2<R, D>
    : ServiceRecord3<R, D, Q>;
  declare interface UploadData {
    url: string;
    filePath: string;
    name: string;
    header?: any;
    formData?: any;
    onProgressUpdate?: (progress: number) => void;
  }
}
