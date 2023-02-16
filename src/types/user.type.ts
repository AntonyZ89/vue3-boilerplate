export interface UserType {
  id: number;
  name: string;
  password: string;
}

export type UserTypeRegister = Omit<UserType, "id">;

export type UserTypeCreate = Omit<UserType, "id" | "password"> &
  Partial<Pick<UserType, "id" | "password">>;

export interface UserAuthResponseSuccess {
  message: string;
  accessToken?: string;
}

export interface UserAuthResponseError {
  message: string;
  errors: { [field: string]: string };
}

export function isUserType(object: unknown): object is UserType {
  return !!object && typeof object === "object" && "access_token" in object;
}
