export default interface AuthLoginPort {
  execute(email: string, password: string): Promise<string>;
}

export const AUTH_LOGIN = Symbol('AUTH_LOGIN');
