export interface ScanResult {
  url: string;
  status: ScanStatus;
  score: number;
  reasons: string[];
}