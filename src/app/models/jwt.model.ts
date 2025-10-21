import { jwtDecode } from 'jwt-decode';

export default interface DecodedToken {
  userId: string;
  role: 'user' | 'admin';
  exp: number;
  iat: number;
}
