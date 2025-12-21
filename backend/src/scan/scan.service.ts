import { BadRequestException, Injectable } from '@nestjs/common';
import { ScanStatus } from '../common/constants/scan-status';
import { ScanResultDto } from './dto/scan-result.dto';
import { BlacklistService } from './blacklist/blacklist.service';
import { ScanQueueService } from './queue/scan-queue.service';
import { ScanHistoryService } from './history/scan-history.service';

@Injectable()
export class ScanService {
  constructor(
    private readonly blacklist: BlacklistService,
    private readonly queue: ScanQueueService,
    private readonly history: ScanHistoryService,
  ) {}

  async scan(url: string): Promise<ScanResultDto> {
    console.log('🧠 [BK] Service scanning URL:', url);
    if (this.blacklist.isBlacklisted(url)) {
      console.log('⛔ [BK] URL is blacklisted');
      throw new BadRequestException('URL is blacklisted');
    }

    await this.queue.process();

    const result = this.analyze(url);
    console.log('✅ [BK] Scan result:', result.level, result.score);

    this.history.record(result);

    return result;
  }

  private analyze(url: string): ScanResultDto {
    let score = 0;
    const threats: string[] = [];

    if (!url.startsWith('https://')) {
      score += 30;
      threats.push('No HTTPS encryption detected');
    }

    if (score >= 50) {
      return {
        level: ScanStatus.CRITICAL,
        title: 'CRITICAL THREAT',
        subtitle: 'High-risk malicious link detected',
        risk: 'CRITICAL',
        threatLevel: 'HIGH',
        type: 'Potential Phishing',
        ssl: url.startsWith('https://') ? 'Enabled' : 'Disabled',
        url,
        threats,
        score,
      };
    }

    return {
      level: ScanStatus.SAFE,
      title: 'SECURE',
      subtitle: 'No immediate threats detected',
      risk: 'LOW',
      threatLevel: 'MINIMAL',
      type: 'Legitimate URL',
      ssl: 'Enabled',
      url,
      threats: [],
      score,
    };
  }

  getHistory(): ScanResultDto[] {
    return this.history.findAll();
  }
}
