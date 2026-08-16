import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { PrismaModule, PrismaService } from '@org/models';
import { createAuth } from '../auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const authModule = AuthModule.forRootAsync({
  imports: [PrismaModule],
  inject: [PrismaService],
  useFactory: (prisma: PrismaService) => ({
    auth: createAuth(prisma),
    disableGlobalAuthGuard: true,
  }),
});

@Module({
  imports: [authModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
