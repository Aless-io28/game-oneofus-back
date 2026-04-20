export const HASH_SERVICE = Symbol('HASH_SERVICE');

export interface HashService {
  hash(data: string): Promise<string>;
  compare(data: string, hash: string): Promise<boolean>;
}
