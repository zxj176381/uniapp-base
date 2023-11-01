export declare global {
  declare interface UseListLoadOptions {
    pageNo?: number;
    pageSize?: number;
  }
  declare interface UseListLoadCallbackOptions {
    pageNo: number;
    pageSize: number;
    setLoadLoading?: (isLoading: boolean) => void;
    setLoadEnd?: () => void;
  }
}
