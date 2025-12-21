'use client';
import { Lock, Search } from 'lucide-react';
export default function UrlInput({ url, loading, onChange, onScan }: { url: string; loading: boolean; onChange: (url: string) => void; onScan: () => void }) {
    return (
        <>
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
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onScan()}
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
            onClick={onScan}
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
        </>
    );
}