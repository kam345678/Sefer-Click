'use client';
import MouseFollower from '@/components/demo/MouseFollower';
// app/page.tsx (App Router)
import SaferClick from '@/components/scan/SaferClick';
import Header from '@/components/scan/Header';
// import ScanResult from '@/components/scan/ScanResult';
export default function Home() {

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden ">
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-700 rounded-full filter blur-3xl opacity-10"></div> 

      <div className="w-4xl ">
        <Header />
        <SaferClick />
      </div>
      {/* <MouseFollower /> */}
    </div>
  );
}