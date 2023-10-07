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
}
