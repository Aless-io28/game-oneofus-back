import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

import { ConfigModule } from '@nestjs/config';
import authConfig from '@config/auth/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: `${process.cwd()}/src/i18n/`,
        watch: true,
      },
      resolvers: [new QueryResolver(['lang']), new HeaderResolver()],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
