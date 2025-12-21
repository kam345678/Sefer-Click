'use client';
import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Lock, Unlock, Zap, Search, LucideIcon } from 'lucide-react';

export default function SaferClick() {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
  type ScanResult = {
  level: 'critical' | 'warning' | 'safe';
  title: string;
  subtitle: string;
  icon: LucideIcon; // any
  risk: string;
  threatLevel: string;
  type: string;
  ssl: string;
  url: string;
  threats: string[];
  score: number;
};

const [result, setResult] = useState<ScanResult | null>(null);

  const analyzeUrl = (inputUrl: string): ScanResult => {
    const suspiciousPatterns = ['login', 'verify', 'account', 'secure', 'update', 'confirm', 'banking', 'paypal'];
    const dangerousDomains = ['bit.ly', 'tinyurl', 'goo.gl', 'shorturl'];
    
    let riskScore = 0;
    const threats = [];

    const lowerUrl = inputUrl.toLowerCase();
    
    if (!inputUrl.startsWith('https://')) {
      riskScore += 30;
      threats.push('No HTTPS encryption detected');
    }

    suspiciousPatterns.forEach(pattern => {
      if (lowerUrl.includes(pattern)) {
        riskScore += 15;
        threats.push(`Suspicious keyword: "${pattern}"`);
      }
    });

    dangerousDomains.forEach(domain => {
      if (lowerUrl.includes(domain)) {
        riskScore += 25;
        threats.push('URL shortener detected - potential phishing');
      }
    });

    if (inputUrl.includes('@')) {
      riskScore += 35;
      threats.push('@ symbol detected - possible redirect attack');
    }

    const ipPattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipPattern.test(inputUrl)) {
      riskScore += 30;
      threats.push('IP address instead of domain - suspicious');
    }

    if (riskScore >= 50) {
      return {
        level: 'critical',
        title: 'CRITICAL THREAT',
        subtitle: 'High-risk malicious link detected',
        icon: XCircle,
        risk: 'CRITICAL',
        threatLevel: 'HIGH',
        type: 'Potential Phishing/Malware',
        ssl: inputUrl.startsWith('https://') ? 'Enabled' : 'Disabled',
        url: inputUrl,
        threats: threats.slice(0, 3),
        score: riskScore
      };
    } else if (riskScore >= 25) {
      return {
        level: 'warning',
        title: 'WARNING',
        subtitle: 'Suspicious activity detected',
        icon: AlertTriangle,
        risk: 'MEDIUM',
        threatLevel: 'MODERATE',
        type: 'Suspicious Link',
        ssl: inputUrl.startsWith('https://') ? 'Enabled' : 'Disabled',
        url: inputUrl,
        threats: threats.slice(0, 2),
        score: riskScore
      };
    } else {
      return {
        level: 'safe',
        title: 'SECURE',
        subtitle: 'No immediate threats detected',
        icon: CheckCircle,
        risk: 'LOW',
        threatLevel: 'MINIMAL',
        type: 'Legitimate URL',
        ssl: inputUrl.startsWith('https://') ? 'Enabled' : 'Not Available',
        url: inputUrl,
        threats: [],
        score: riskScore
      };
    }
  };

  const handleScan = () => {
    if (!url.trim()) {
      alert('Please enter a URL to scan');
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeUrl(url);
      setResult(analysis);
      setLoading(false);
    }, 2000);
  };

  const resetScan = () => {
    setUrl('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>
      </div>

      {/* Red glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-700 rounded-full filter blur-3xl opacity-10"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Shield className="w-16 h-16 text-red-500" strokeWidth={2.5} />
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-50"></div>
            </div>
            <h1 className="text-6xl font-black tracking-tighter">
              <span className="text-white">SAFER</span>
              <span className="text-red-500">CLICK</span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg font-semibold tracking-wide uppercase">
            Advanced URL Threat Detection System
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-red-500 text-sm font-mono">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>SECURITY PROTOCOL ACTIVE</span>
          </div>
        </header>

        {/* Scanner Card */}
        <div className="bg-gray-900 border-2 border-red-900 rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-500 to-transparent"></div>
          
          <div className="mb-6">
            <label className="block text-gray-300 font-bold mb-3 text-sm uppercase tracking-wider">
              <Lock className="inline w-4 h-4 mr-2" />
              Target URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                placeholder="https://example.com"
                className="w-full px-6 py-4 bg-black border-2 border-gray-700 rounded-xl text-gray-100 placeholder-gray-600 focus:border-red-500 focus:outline-none transition-all font-mono text-lg"
                disabled={loading}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <button
            onClick={handleScan}
            disabled={loading}
            className="w-full py-5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-lg rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/50 uppercase tracking-wider flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ANALYZING...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                INITIATE SCAN
              </>
            )}
          </button>

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block px-4 py-2 bg-black border border-red-900 rounded-lg">
                <p className="text-red-500 font-mono text-sm animate-pulse">
                  &gt; Running security protocols...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className={`bg-gray-900 border-2 rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 ${
            result.level === 'critical' ? 'border-red-500' :
            result.level === 'warning' ? 'border-yellow-500' :
            'border-green-500'
          }`}>
            <div className="flex items-start gap-6 mb-8">
              <div className={`p-4 rounded-xl ${
                result.level === 'critical' ? 'bg-red-500/20' :
                result.level === 'warning' ? 'bg-yellow-500/20' :
                'bg-green-500/20'
              }`}>
                <result.icon className={`w-12 h-12 ${
                  result.level === 'critical' ? 'text-red-500' :
                  result.level === 'warning' ? 'text-yellow-500' :
                  'text-green-500'
                }`} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h2 className={`text-3xl font-black mb-2 ${
                  result.level === 'critical' ? 'text-red-500' :
                  result.level === 'warning' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {result.title}
                </h2>
                <p className="text-gray-400 font-semibold">{result.subtitle}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
                result.level === 'critical' ? 'bg-red-500/20 text-red-500' :
                result.level === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-green-500/20 text-green-500'
              }`}>
                RISK: {result.risk}
              </div>
            </div>

            {/* Threat Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-black border border-gray-800 rounded-xl p-4">
                <div className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">Target URL</div>
                <div className="text-gray-200 font-mono text-sm break-all">{result.url}</div>
              </div>
              <div className="bg-black border border-gray-800 rounded-xl p-4">
                <div className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">Classification</div>
                <div className="text-gray-200 font-semibold">{result.type}</div>
              </div>
              <div className="bg-black border border-gray-800 rounded-xl p-4">
                <div className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">SSL Status</div>
                <div className="flex items-center gap-2">
                  {result.ssl === 'Enabled' ? (
                    <>
                      <Lock className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 font-semibold">{result.ssl}</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 font-semibold">{result.ssl}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-black border border-gray-800 rounded-xl p-4">
                <div className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">Threat Level</div>
                <div className="flex items-center gap-2">
                  <Zap className={`w-4 h-4 ${
                    result.level === 'critical' ? 'text-red-500' :
                    result.level === 'warning' ? 'text-yellow-500' :
                    'text-green-500'
                  }`} />
                  <span className={`font-semibold ${
                    result.level === 'critical' ? 'text-red-500' :
                    result.level === 'warning' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>{result.threatLevel}</span>
                </div>
              </div>
            </div>

            {/* Threats Detected */}
            {result.threats.length > 0 && (
              <div className="bg-black border border-red-900 rounded-xl p-6 mb-6">
                <h3 className="text-red-500 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <AlertTriangle className="w-5 h-5" />
                  Threats Detected
                </h3>
                <ul className="space-y-2">
                  {result.threats.map((threat, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-red-500 font-bold mt-1">▸</span>
                      <span className="font-mono text-sm">{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={resetScan}
              className="w-full py-4 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 text-gray-300 font-bold rounded-xl transition-all uppercase tracking-wider"
            >
              Scan Another URL
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-red-500" />
            <span className="font-mono text-sm uppercase">Protected by SaferClick Security Protocol</span>
          </div>
          <p className="text-xs">Advanced Threat Detection & URL Analysis System</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}