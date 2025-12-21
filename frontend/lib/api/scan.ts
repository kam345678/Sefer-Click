import { ScanResult } from '../../../shared/types/scan-result';

export async function scanUrl(url: string): Promise<ScanResult> {
  const res = await fetch('http://localhost:3000/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error('Scan failed');
  return res.json();
}