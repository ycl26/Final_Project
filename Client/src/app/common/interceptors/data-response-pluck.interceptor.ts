import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {LogService} from '../services/log.service';

const HTTP_STATUS_CODE_SUCCESS = 200;
const HTTP_STATUS_CODE_NOT_FOUND = 400;

@Injectable()
export class DataResponsePluckInterceptor implements HttpInterceptor {
  constructor(private logService: LogService) {
  }

  createErrorMessage(statusCode, message) {
    const messageByCode = {
      [HTTP_STATUS_CODE_NOT_FOUND]: 'not found'
    };
    return {
      error: true,
      message,
    };
  }

  createSuccessMessage(data) {
    return {
      error: false,
      data,
    };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          response => {
            if (response instanceof HttpResponse) {
              switch (response.status) {
                case HTTP_STATUS_CODE_SUCCESS:
                  const data = response.body && (response.body as any).data;
                  return this.createSuccessMessage(data);
                case HTTP_STATUS_CODE_NOT_FOUND:
                  return this.createErrorMessage(response.status, response.body);
                default:
                  this.logService.log(response);
              }
            }
          },
          // Operation failed; error is an HttpErrorResponse
          error => this.logService.log(error)
        )
      );
  }
}
