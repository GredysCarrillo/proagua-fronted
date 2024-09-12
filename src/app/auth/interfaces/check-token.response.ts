import { User } from "./user.interface";


export interface checkTokenResponse {
  user:  User;
  token: string;
}
