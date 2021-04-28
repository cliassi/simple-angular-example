import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  count = 0;
  constructor(private storage: StorageService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.count++;

    const token = this.storage.get('access_token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return next.handle(request);
    return next.handle(request).pipe(
      tap(
        (event) => {
          // console.log(event);
        },

        (error) => {
          // console.log(error);
        }
      ),
      finalize(() => {
        this.count--;

        if (this.count == 0) {
          // console.log("hide spinner");
        }
      })
    );
  }
}
