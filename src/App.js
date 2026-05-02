import React from 'react';
import { useWebsiteLogic } from './useWebsiteLogic';

function App() {
  const { lang, t, toggleLanguage } = useWebsiteLogic();

  return (
    /* Main container: Deep dark blue-black background */
    <div className="min-h-screen bg-[#020617] font-sans text-slate-200">

      {/* Navigation: Glassmorphism effect */}
      <nav className="p-6 bg-[#0f172a]/80 backdrop-blur-md border-b border-blue-900/50 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-3xl font-black text-blue-400 tracking-tighter drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
          {t.title}
        </h1>
        <button
          onClick={toggleLanguage}
          className="bg-blue-600/10 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-md font-mono text-sm hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          {lang === 'he' ? 'ENGLISH' : 'FRANÇAIS'}
        </button>
      </nav>

      {/* Hero: Darker gradient with blue glow */}
      <header className="py-16 px-6 text-center bg-gradient-to-b from-[#1e293b] to-[#020617]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-3xl font-black mb-6 leading-tight uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500">
            {t.hero}
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
            {t.sub}
          </p>
        </div>
      </header>

      {/* Features: Neon blue borders and dark cards */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-blue-900/50 bg-[#0f172a] hover:border-cyan-500/50 shadow-2xl transition-all duration-500 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
                  {f.icon}
                </span>
                <h3 className="text-2xl font-black text-blue-100 group-hover:text-cyan-400 transition-colors">
                  {f.title}
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-lg font-light">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio: Grid of dark interactive cards */}
      <section className="bg-[#0b1120] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] text-blue-500">
            {t.portfolioTitle}
          </h2>
          <p className="text-slate-500 mb-12 font-mono uppercase text-sm tracking-widest">
            {t.dashboardTag}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {t.sites.map((site, idx) => (
              <a
                href={site.url}
                key={idx}
                className="group block bg-[#1e293b]/30 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="h-48 bg-slate-800 flex items-center justify-center group-hover:bg-blue-900/40 transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-6xl font-black text-slate-700 group-hover:text-blue-400/30 transition-all">
                    {site.name[0]}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold text-cyan-500 uppercase mb-1 tracking-[3px]">
                    {site.category}
                  </p>
                  <h4 className="text-xl font-bold text-slate-100 group-hover:text-white">
                    {site.name}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer: Stark black with electric accents */}
      <footer className="bg-black text-white py-16 text-center px-6 border-t border-blue-900/30">
        <p className="text-3xl font-black mb-4 italic tracking-tighter text-blue-500">
          EXTREME CUSTOMIZATION. ABSOLUTE CONTROL.
        </p>
        <p className="text-slate-500 font-mono text-xs mb-4 uppercase tracking-[0.4em]">
          Building the digital future
        </p>
        <div className="mt-8 pt-8 border-t border-slate-900 text-xs opacity-40 font-mono">
          © {new Date().getFullYear()} {t.title} // SYSTEM_INIT_COMPLETE
        </div>
      </footer>
    </div>
  );
}

export default App;