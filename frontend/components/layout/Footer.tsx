'use client'
import { Shield } from "lucide-react"
export default function Footer(){
    return(
        <>
            {/* Footer */}
            <footer className="text-center mt-16 text-gray-600 relative">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    <span className="font-mono text-sm uppercase">Protected by SaferClick Security Protocol</span>
                </div>
                <p className="text-xs">Advanced Threat Detection & URL Analysis System</p>
            </footer>
        </>
    )
}