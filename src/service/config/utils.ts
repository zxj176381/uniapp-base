import { responseStatusMap } from "./constants";

export function normalizeResponseData(data: ServiceResponse<any>) {
  let _status = responseStatusMap.SUCCESS;
  const _code = data.code;
  const _msg = data.message;
  if (_code !== 200) {
    _status = responseStatusMap.FAIL;
  }
  return {
    ...data,
    _status,
    _msg
  };
}
