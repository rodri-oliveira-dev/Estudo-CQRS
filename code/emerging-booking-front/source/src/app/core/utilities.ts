import * as CryptoJS from 'crypto-js';
//import { createHash } from 'crypto';


export class CryptoUtilities {
    static base64(value: any): string {
        return btoa(value);
    }

    static sha256(message: string) {
        return CryptoJS.SHA256(message)
            .toString(CryptoJS.enc.Base64)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }

    static random(): number{
        return Math.random();
    }
}
