import * as bcrypt from 'bcrypt';

import { HashService } from './has.service';

export class BcryptHashService implements HashService {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
