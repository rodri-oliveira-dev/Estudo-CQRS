export interface Token {
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: Date;
    token_type: string;
    local_user: any;
  }