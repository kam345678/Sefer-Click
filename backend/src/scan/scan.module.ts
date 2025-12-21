import { Module } from '@nestjs/common';
import { ScanController } from './scan.controller';
import { ScanService } from './scan.service';
import { BlacklistService } from './blacklist/blacklist.service';
import { ScanQueueService } from './queue/scan-queue.service';
import { ScanHistoryService } from './history/scan-history.service';

@Module({
  controllers: [ScanController],
  providers: [
    ScanService,
    BlacklistService,
    ScanQueueService,
    ScanHistoryService,
  ],
})
export class ScanModule {}
