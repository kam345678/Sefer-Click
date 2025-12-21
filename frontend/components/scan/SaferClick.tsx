'use client';
import { useState } from 'react';
import UrlInput from './UrlInput';
import ScanResultView from './ScanResult';
import { scanUrl } from '@/services/scan.service';
import { ScanResult } from './types';
import Footer from '../layout/Footer';
export default function SaferClick() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

const handleScan = async () => {
  if (!url.trim()) return alert('Please enter URL');

  setLoading(true);
  try {
    const data = await scanUrl(url);   // 👈 รับผลจาก backend
    console.log('✅ FRONT RESULT:', data);
    setResult(data);                   // 👈 จุดสำคัญที่สุด
  } catch (err) {
    console.error(err);
    alert('Scan failed');
  } finally {
    setLoading(false);
  }
};
  return (
    <div className=" text-gray-100">
      
      {!result && (
        <UrlInput
          url={url}
          loading={loading}
          onChange={setUrl}
          onScan={handleScan}
        />
      )}

      {result && (
        <ScanResultView
          result={result}
          resetScan={() => setResult(null)}
        />
      )}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}