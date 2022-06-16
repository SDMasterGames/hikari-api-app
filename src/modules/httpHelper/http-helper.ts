import { IHttpResponse } from "./";
import { ServerError } from "../errors/server-error";

export const badRequest = (error: Error): IHttpResponse => ({
  status: 400,
  error: error,
});

export const ok = (data: any): IHttpResponse => ({
  status: 200,
  data,
});

export const serverError = (reason: string): IHttpResponse => ({
  status: 500,
  error: new ServerError(reason),
});
