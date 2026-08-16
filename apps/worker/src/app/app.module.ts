import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from '@org/models';
import Redis from 'ioredis';
import { DefaultProcessor } from './default.processor';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

@Module({
  imports: [
    PrismaModule,
    BullModule.forRoot({
      connection,
    }),
    BullModule.registerQueue({
      name: 'default',
    }),
  ],
  providers: [DefaultProcessor],
})
export class AppModule {}
