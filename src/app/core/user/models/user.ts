export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  name: string;
  id: number;
  token?: string
}
