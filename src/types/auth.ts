export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  avatar: string | null;
  birthDate: string | null;
  userType: 'SUPER_ADMIN' | 'MARKETER';
  status: string;
  marketerOwnerId: string | null;
  parentUserId: string | null;
  lastLoginAt: string;
  emailVerifiedAt: string;
  createdAt: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: User;
}