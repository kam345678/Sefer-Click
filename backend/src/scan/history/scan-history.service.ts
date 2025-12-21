import { Injectable } from '@nestjs/common';
import { ScanResultDto } from '../dto/scan-result.dto';

@Injectable()
export class ScanHistoryService {
  private readonly history: ScanResultDto[] = [];

  record(result: ScanResultDto) {
    this.history.push(result);
  }

  findAll(): ScanResultDto[] {
    return this.history;
  }
}
