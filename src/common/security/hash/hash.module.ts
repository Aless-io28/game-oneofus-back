import { Module } from '@nestjs/common';

import { BcryptHashService } from './bcrypt-hash.service';
import { HASH_SERVICE } from './has.service';

@Module({
  providers: [
    {
      provide: HASH_SERVICE,
      useClass: BcryptHashService,
    },
  ],
  exports: [HASH_SERVICE],
})
export class HashModule {}
