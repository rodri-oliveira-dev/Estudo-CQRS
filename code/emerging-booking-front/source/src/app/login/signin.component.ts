import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSession } from '../core/app-session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from './shared/token.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-signin',
    template: ``
})

export class SigninComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient) { }


        
    ngOnInit() { }
    
    ngAfterViewInit() { 
        /**
         * Recuperando parametros da URL
         */
        const code = this.route.snapshot.queryParamMap.get("code");
        const state = this.route.snapshot.queryParamMap.get("state");

        /**
         * Verificando se existe o code de autorização e o state
         */
        if (code && (state === AppSession.StateCode)) {
            /**
             * Cabeçalho (Header) da requisição
             */
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };

            /**
             * Corpo (Body) da requisição
             */
            const body = {
                "grant_type": "authorization_code",
                "client_id": environment.clientId,
                "code_verifier": AppSession.CodeVerifier,
                "code": code,
                "redirect_uri": "http://10.51.5.72:4200/home"
            };
  
            return this.http.post<Token>(`${environment.urlBaseDSSO}oauth/token`, body, httpOptions)
                .subscribe(
                    (data) => this.onSuccess(data),
                    (error) => this.onError(error)
                );
        }
        else {
            console.log("Falta de parametros");

        }
    }

    private onSuccess(data: any) {
        console.log(data);
        AppSession.ObjectToken(data);
        sessionStorage.removeItem("DSSO.CV");
        sessionStorage.removeItem("DSSO.SC");
        this.router.navigate(['/home']);

    }

    private onError(error: any) {
        console.log(error);

    }


}