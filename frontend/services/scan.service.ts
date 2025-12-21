// services/scan.service.ts
import { ScanResult } from '@/components/scan/types';

export async function scanUrl(url: string): Promise<ScanResult> {
  const res = await fetch('/api/scan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error('Scan failed');
  }

  return res.json();
}