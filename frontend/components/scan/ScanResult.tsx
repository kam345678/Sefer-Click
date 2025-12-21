'use client';
import { AlertTriangle, Lock, Unlock, Zap, ShieldCheck, XCircle } from 'lucide-react';
import { ScanResult as ScanResultType } from './types';

const levelIconMap = {
  critical: XCircle,
  warning: AlertTriangle,
  safe: ShieldCheck,
};

export default function ScanResult({ result, resetScan }: { result: ScanResultType, resetScan: () => void }) {
    const Icon = levelIconMap[result.level];
  return (
      <div className='relative' >
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
                  <Icon className={`w-12 h-12 ${
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
    </div>
  )
}