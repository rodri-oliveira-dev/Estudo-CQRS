import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppSession } from './app-session';
import { HomeHostService } from '../home/shared/home-host.service';

@Injectable({ providedIn: 'root' })
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private homeHostService: HomeHostService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = AppSession.AccessToken;
        if (token) {
            req = req.clone(
                { headers: req.headers.set('Authorization', `${AppSession.TypeToken} ${token}`) }
            )
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone(
                { headers: req.headers.set('Content-Type', 'application/json') }
            )
        }

        return next.handle(req)
        
            .pipe(
                tap( event => event instanceof HttpResponse ? 'succeeded' : '',
                error => {
                    if (error instanceof HttpErrorResponse) {
                        console.log("Error interceptor", error);
    
                        if (error.status === 401 && error.statusText === 'Unauthorized') {
                            AppSession.redirectPageLogin();
                            this.homeHostService.logoutHost();
                        }
                    }
                    return next.handle(req);
                }
                
                ));
                
    }
}