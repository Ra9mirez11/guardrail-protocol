import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#030407] text-white font-mono space-y-4">
      <h2 className="text-4xl font-black text-emerald-400">404</h2>
      <p className="text-sm text-slate-400">Target contract not found in registry.</p>
      <Link 
        href="/" 
        className="px-5 py-2.5 rounded-xl bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider"
      >
        Return to Radar
      </Link>
    </div>
  );
}
