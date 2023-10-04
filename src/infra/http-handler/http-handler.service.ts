import { Injectable, Scope } from '@nestjs/common';
import { IHttpHandler } from './http-handler.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

interface IHeader {
  [key: string]: string;
}

@Injectable()
export class HttpHandlerService implements IHttpHandler {
  constructor(private httpService: HttpService) {}
  private headers: IHeader;

  setHeaders(headers: IHeader) {
    this.headers = {
      ...this.headers,
      ...headers, // override
    };
  }

  async get<Res>(path: string, params: unknown): Promise<Res> {
    const res = await lastValueFrom(
      this.httpService.get<Res>(path, { headers: this.headers, params }),
    );
    return res.data;
  }
  async post<Res>(path: string, req: unknown): Promise<Res> {
    const res = await lastValueFrom(
      this.httpService.post<Res>(path, req, { headers: this.headers }),
    );
    return res.data;
  }
  async put<Res>(path: string, req: unknown): Promise<Res> {
    const res = await lastValueFrom(
      this.httpService.put<Res>(path, req, { headers: this.headers }),
    );
    return res.data;
  }
  async patch<Res>(path: string, req: unknown): Promise<Res> {
    const res = await lastValueFrom(
      this.httpService.patch<Res>(path, req, { headers: this.headers }),
    );
    return res.data;
  }
  async delete<Res>(path: string): Promise<Res> {
    const res = await lastValueFrom(
      this.httpService.delete<Res>(path, { headers: this.headers }),
    );
    return res.data;
  }
}
