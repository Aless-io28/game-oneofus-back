import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { I18nModule } from 'nestjs-i18n';
import path from 'node:path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
