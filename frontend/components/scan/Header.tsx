'use client';
import { Shield } from 'lucide-react';
export default function Header() {
    return (
        <div>    
            {/* Header */}
            <header className="text-center mb-16 relative">
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
        </div>
    );
}