import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScanModule } from './scan/scan.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ScanModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
