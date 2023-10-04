export interface IHttpHandler {
  get<Res>(path: string, params: unknown, headerConfig: unknown): Promise<Res>
  post<Req, Res>(path: string, req: Req, headerConfig: unknown): Promise<Res>
  put<Req, Res>(path: string, req: Req): Promise<Res>
  patch<Req, Res>(path: string, req: Req): Promise<Res>
  delete<Req, Res>(path: string, req: Req): Promise<Res>
}
