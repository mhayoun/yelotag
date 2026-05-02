import React from 'react';
import { useWebsiteLogic } from './useWebsiteLogic';

function App() {
  const { lang, t, toggleLanguage } = useWebsiteLogic();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navigation */}
      <nav className="p-6 bg-white shadow-sm flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-3xl font-black text-yellow-500 tracking-tighter">{t.title}</h1>
        <button
          onClick={toggleLanguage}
          className="bg-gray-100 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
        >
          {lang === 'he' ? 'English' : 'עברית'}
        </button>
      </nav>

      {/* Hero */}
      <header className="py-24 px-6 text-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight uppercase">
            {t.hero}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            {t.sub}
          </p>
        </div>
      </header>

      {/* Features - Uniform Format for all 4 */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border-b-4 border-yellow-500 bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{f.icon}</span>
                <h3 className="text-2xl font-black">{f.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">
            {t.portfolioTitle}
          </h2>
          <p className="text-gray-500 mb-12">{t.dashboardTag}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {t.sites.map((site, idx) => (
              <a
                href={site.url}
                key={idx}
                className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition text-left"
              >
                <div className="h-48 bg-gray-300 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                  <span className="text-4xl font-bold text-white opacity-50">{site.name[0]}</span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-yellow-600 uppercase mb-1">{site.category}</p>
                  <h4 className="text-xl font-bold">{site.name}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 text-center px-6">
        <p className="text-3xl font-bold mb-4 italic">Extreme Customization. Absolute Control.</p>
        <p className="text-yellow-500 font-bold mb-4 uppercase tracking-widest">
          Add anything you need as you go
        </p>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm opacity-50">
          © {new Date().getFullYear()} {t.title} - Professional Web Solutions
        </div>
      </footer>
    </div>
  );
}

export default App;