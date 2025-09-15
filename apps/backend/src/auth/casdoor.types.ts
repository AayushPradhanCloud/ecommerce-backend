export interface CasdoorUser {
  id: string;
  name: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  [key: string]: any;
}

export interface CasdoorTokenResponse {
  access_token: string;
  refresh_token?: string;
  [key: string]: any;
}
