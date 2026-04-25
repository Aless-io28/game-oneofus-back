export default interface AuthRegisterPort {
  execute(username: string, email: string, password: string): Promise<string>;
}

export const AUTH_REGISTER = Symbol('AUTH_REGISTER');
