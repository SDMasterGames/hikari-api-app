export * from "./http-helper";
export interface IHttpRequest {
    body?: any;
    params?: any;
    query?: any;
  }
  
  export interface IHttpResponse {
    status: number;
    data?: any;
    error?: any;
  }
  