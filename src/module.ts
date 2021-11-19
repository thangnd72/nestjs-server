import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from '@schemas/01.model-names';
import { UserSchema } from '@schemas/user';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@utils/passport-guard';
import { JwtStrategy } from '@utils/passport-strategy';
import { controllers } from '@controllers/index';
import { jobs } from '@jobs/index';
import { services } from '@services/index';
import { Seeder } from '@utils/seeder';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-app', {
      useNewUrlParser: true,
    }),
    CacheModule.register(),
    MongooseModule.forFeature([{ name: ModelName.User, schema: UserSchema }]),
    passportModule,
    JwtModule.register({
      secretOrPrivateKey: 'jwt',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [...controllers],
  providers: [
    // auth tất cả
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard ,
    // },
    ...services,
    ...jobs,
    Seeder,
    JwtStrategy,
  ],
})
export class AppModule {}
