import request from "../config";
import type { LoginServiceData, LoginServiceResult } from "./types";

export const loginService: Service<LoginServiceResult, LoginServiceData> = (data) => {
  return request({
    path: "login",
    method: "POST",
    data
  });
};
