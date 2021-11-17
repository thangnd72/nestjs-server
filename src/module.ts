import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from '@schemas/01.model-names';
import { UserSchema } from '@schemas/user';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthService } from '@services/auth';
import { APP_GUARD } from '@nestjs/core';
import { PpGuard } from '@utils/passport-guard';
import { JwtStrategy } from '@utils/passport-strategy';
import { controllers } from '@controllers/index';
import { jobs } from '@jobs/index';
import { services } from '@services/index';
import { Seeder } from '@utils/seeder';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-app', {
      useNewUrlParser: true,
    }),
    CacheModule.register(),
    MongooseModule.forFeature([{ name: ModelName.User, schema: UserSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [...controllers],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PpGuard,
    },
    ...services,
    ...jobs,
    Seeder,
    // JwtStrategy,
  ],
})
export class AppModule {}
