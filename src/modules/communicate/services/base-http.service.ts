import {HttpClient, HttpHandler} from '@angular/common/http';
import {Inject} from '@angular/core';
import {IHttpConfig} from '../models/http-config';
import {environment} from '../../../environments/environment';

export abstract class BaseHttpService extends HttpClient {

  protected get _baseUrl(): string {
    return this._getBaseUrl(environment.httpConfig);
  }

  constructor( @Inject(HttpHandler) handler: HttpHandler) {
    super(handler);
  }

  protected abstract _getBaseUrl(config: IHttpConfig): string;

  protected concatUrl(url: string): string {
    return this._baseUrl + url;
  }
}
