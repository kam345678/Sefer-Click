import { Injectable } from '@nestjs/common';

@Injectable()
export class ScanQueueService {
  async process(): Promise<void> {
    // simulate async job
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}
