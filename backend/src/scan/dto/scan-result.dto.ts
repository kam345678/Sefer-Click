import { ScanStatus } from '../../common/constants/scan-status';

export class ScanResultDto {
  level: ScanStatus;
  title: string;
  subtitle: string;
  risk: string;
  threatLevel: string;
  type: string;
  ssl: string;
  url: string;
  threats: string[];
  score: number;
}
