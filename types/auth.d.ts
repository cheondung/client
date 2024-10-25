interface Session {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
}

interface CustomJwtPayload {
  exp: number;
  iat: number;
  iss: string;
  sub: number;
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
}

interface SignUpDTO {
  email: string;
  password: string;
  shopName: string;
}

type UserRole = 'USER' | 'ADMIN';
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
