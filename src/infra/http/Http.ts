export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  OPTIONS = "options"
}

export interface Http {
  build(method: Method, url: string, callback: Function): void;
  listen(port: number): void;
}