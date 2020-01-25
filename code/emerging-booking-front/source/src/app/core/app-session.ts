import { CryptoUtilities } from './utilities';
import { Token } from '../login/shared/token.model';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export class AppSession {
    static get StateCode(): string {
        if (sessionStorage.getItem("DSSO.SC")) {
            return sessionStorage.getItem("DSSO.SC").replace(/"/g, '');
        }
        else {
            const state = CryptoUtilities.base64(CryptoUtilities.random().toString());
            this.set("DSSO.SC", state)
            return state;
        }
    }

    static get CodeVerifier(): string {
        if (sessionStorage.getItem("DSSO.CV")) {
            return sessionStorage.getItem("DSSO.CV").replace(/"/g, '');
        }
        else {
            const code_verifier = CryptoUtilities.base64(CryptoUtilities.random().toString());
            this.set("DSSO.CV", code_verifier.replace(/"/g, ''))
            return code_verifier;
        }
    }

    static get CodeChallenge(): string {
        const code_verifier = this.CodeVerifier;
        const code_shar256 = CryptoUtilities.sha256(code_verifier);

        return code_shar256;
    }

    static ObjectToken(data: Token) {
        this.set("DSSO.AT", data.access_token);
        this.set("DSSO.RF", data.refresh_token);
        this.set("DSSO.IT", data.id_token);
        this.set("DSSO.TT", data.token_type);
        this.set("DSSO.LU", data.local_user);
        this.set("DSSO.EI", data.expires_in);
    }

    static get AccessToken(): string {
        if (sessionStorage.getItem("DSSO.AT")) {
            return sessionStorage.getItem("DSSO.AT").replace(/"/g, '');
        }
    }

    static get RefreshToken(): string {
        if (sessionStorage.getItem("DSSO.RF")) {
            return sessionStorage.getItem("DSSO.RF").replace(/"/g, '');
        }
    }

    static get IdToken(): string {
        if (sessionStorage.getItem("DSSO.IT")) {
            return sessionStorage.getItem("DSSO.IT").replace(/"/g, '');
        }
    }

    static get TypeToken(): string {
        if (sessionStorage.getItem("DSSO.TT")) {
            return sessionStorage.getItem("DSSO.TT").replace(/"/g, '');
        }
    }

    static get ExpiresIn() {
        if (sessionStorage.getItem("DSSO.EI")) {
            return parseInt(sessionStorage.getItem("DSSO.EI"));
        }
    }

    static get LocalUser(): string {
        if (sessionStorage.getItem("DSSO.LU")) {
            return sessionStorage.getItem("DSSO.LU");
        }
    }

    /**
     * Método que grava o objeto do usuário na sessionStorage
     * O método recebe um Object e transforma em um JSON antes de gravar
     * na sessionStorage 
     */
    static set(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    /** 
     * Método que recupera o objeto do usuário logado na sessionStorage
     * e após a recuperação do objeto, o mesmo é removido da sessionStorage
     * para que não ocorra uma duplicação de objetos
     */
    static get(key: string, keepAlive: boolean = false) {
        const result = JSON.parse(sessionStorage.getItem(key));

        if (!keepAlive) {
            sessionStorage.removeItem(key);
        }

        return result;
    }

    /** 
     * O método recupera o objeto do usuário e passa como parâmetro o valor "true"
     * para que o usuário permaneça logado na aplicação.
    */
    static getAndKeep(key: string) {
        return this.get(key, true);
    }

    /**
     * Método que verifica se o usuário está logado
     */
    static isLoggedIn(): boolean {
        return this.getAndKeep('DSSO.LU');
    }

    /** 
     * Quando o usuário seleciona o botão "Sair", é executado o
     * Método signout que remove toda sessionStorage
    */

    static signout() {
        sessionStorage.clear();
    }

    static redirectPageLogin() {

        const client_id = environment.clientId;
        const response_type = 'code';
        const redirect_uri = `http://10.51.5.72:4200/signin`;
        const code_challenge = this.CodeChallenge;
        const code_challenge_method = 'S256';
        const state = this.StateCode;

        window.location.href = `${environment.urlBaseDSSO}oauth?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}&state=${state}`;
    }
}