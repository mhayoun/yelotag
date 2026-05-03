import React, {useState} from 'react';
import {useWebsiteLogic} from './useWebsiteLogic';

function App() {
    const {lang, t, toggleLanguage} = useWebsiteLogic();
    const [activeFeature, setActiveFeature] = useState(null);
    const [formData, setFormData] = useState({name: '', email: '', phone: '', message: ''});

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Change "YOUR_FORM_ID" to the ID you get from Formspree.io
        const response = await fetch("https://formspree.io/f/xlgzgpoo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                message: formData.message,
            }),
        });

        if (response.ok) {
            alert(lang === 'he' ? 'ההודעה נשלחה בהצלחה!' : 'Message sent successfully!');
            setFormData({name: '', email: '', phone: '', message: ''}); // Clear form
        } else {
            alert('Oops! There was a problem.');
        }
    };

    const navigateToFeature = (index) => {
        setActiveFeature(index);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({behavior: 'smooth'});
        }
    };


    return (
        <div
            className={`min-h-screen bg-[#020617] font-sans text-slate-200 flex flex-col ${lang === 'he' ? 'rtl' : 'ltr'}`}>

            {/* NAVBAR */}
            <nav
                className="p-3 bg-[#0f172a]/80 backdrop-blur-md border-b border-blue-900/50 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <h1
                        onClick={() => {
                            setActiveFeature(null);
                            window.scrollTo({top: 0, behavior: 'smooth'}); // Scroll to top smoothly
                        }}
                        className="text-xl font-black text-blue-400 tracking-tighter drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] cursor-pointer"
                    >
                        {t.title}
                    </h1>
                    <div className="hidden md:flex gap-6">
                        {t.features.map((f, i) => (
                            <button
                                key={i}
                                onClick={() => navigateToFeature(i)}
                                className={`text-sm font-medium uppercase tracking-wider transition-colors ${activeFeature === i ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'}`}
                            >
                                {f.shortName}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={scrollToContact}
                        className="text-sm font-bold text-blue-400 border border-blue-400/50 px-5 py-2 rounded-full hover:bg-blue-400 hover:text-white transition-all">
                        {t.nav.contact}
                    </button>
                    <button onClick={toggleLanguage}
                            className="bg-blue-600/10 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-md font-mono text-xs hover:bg-blue-600 hover:text-white transition-all">
                        {t.nav.langLabel}
                    </button>
                </div>
            </nav>

            {/* HERO SECTION */}
            {activeFeature === null && (
                <header
                    className="py-16 px-6 text-center bg-gradient-to-b from-[#1e293b] to-[#020617] animate-in fade-in zoom-in-95 duration-700">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-3xl font-black mb-6 leading-tight uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500">
                            {t.hero}
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
                            {t.sub}
                        </p>
                    </div>
                </header>
            )}

            {/* MAIN CONTENT AREA */}
            <main className={`flex-grow flex flex-col ${activeFeature !== null ? 'justify-center min-h-[70vh]' : ''}`}>
                <div className="max-w-6xl mx-auto px-6 py-12 w-full">
                    {activeFeature === null ? (
                        /* GRID VIEW */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-700">
                            {t.features.map((f, i) => (
                                <div
                                    key={i}
                                    onClick={() => navigateToFeature(i)}
                                    className="p-8 rounded-2xl border border-blue-900/50 bg-[#0f172a] hover:border-cyan-500/50 shadow-2xl transition-all duration-500 group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <span
                                            className="text-4xl group-hover:scale-110 transition-transform">{f.icon}</span>
                                        <h3 className="text-2xl font-black text-blue-100 group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed text-lg font-light">{f.desc}</p>
                                    <div
                                        className="mt-4 text-cyan-500 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        {lang === 'he' ? 'קרא עוד ←' : 'Learn More →'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* DETAIL VIEW */
                        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-top-8 duration-500">
                            <div
                                className="p-10 rounded-3xl border border-cyan-500/30 bg-[#0f172a] shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                                <div className="flex items-center gap-6 mb-8">
                                    <span className="text-6xl">{t.features[activeFeature].icon}</span>
                                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                                        {t.features[activeFeature].title}
                                    </h2>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-xl text-slate-300 leading-loose mb-6">{t.features[activeFeature].desc}</p>
                                    <ul className="mt-8 space-y-4 border-l-2 border-cyan-500/20 pl-6">
                                        {t.features[activeFeature].details?.map((detail, index) => (
                                            <li key={index}
                                                className="flex items-start gap-3 text-slate-400 text-lg group">
                                                <span
                                                    className="text-cyan-400 font-bold mt-1 group-hover:scale-125 transition-transform">✓</span>
                                                <span
                                                    className="group-hover:text-slate-200 transition-colors">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* NAVIGATION BUTTONS */}
                                <div className="mt-12 border-t border-slate-800 pt-8">
                                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                                        {/* Home Button */}
                                        <button
                                            onClick={() => setActiveFeature(null)}
                                            className="w-full md:w-auto px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all font-bold"
                                        >
                                            {lang === 'he' ? '🏠 חזרה לדף הבית' : '🏠 Back to Home'}
                                        </button>

                                        {/* Prev/Next Group */}
                                        <div className="flex gap-4 w-full md:w-auto">
                                            <button
                                                onClick={() => navigateToFeature((activeFeature - 1 + t.features.length) % t.features.length)}
                                                className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all font-bold"
                                            >
                                                <span
                                                    className={lang === 'he' ? '' : 'rotate-180 inline-block'}>➜</span> {lang === 'he' ? 'הקודם' : 'Prev'}
                                            </button>

                                            <button
                                                onClick={() => navigateToFeature((activeFeature + 1) % t.features.length)}
                                                className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-cyan-500 transition-all font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                                            >
                                                {lang === 'he' ? 'הבא' : 'Next'} <span
                                                className={lang === 'he' ? 'rotate-180 inline-block' : ''}>➜</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* PORTFOLIO SECTION */}
            <section className="bg-[#0b1120] py-20 px-6 border-t border-slate-900">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] text-blue-500">{t.portfolioTitle}</h2>
                    <p className="text-slate-500 mb-12 font-mono uppercase text-sm tracking-widest">{t.dashboardTag}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {t.sites.map((site, idx) => (
                            <a
                                href={site.url}
                                key={idx}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-[#1e293b]/30 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                            >
                                {/* IMAGE CONTAINER */}
                                <div className="h-48 bg-slate-800 overflow-hidden relative">
                                    {site.image ? (
                                        <img
                                            src={site.image}
                                            alt={site.name}
                                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        /* Fallback to the letter if no image exists */
                                        <div className="flex items-center justify-center h-full">
                        <span
                            className="text-6xl font-black text-slate-700 group-hover:text-blue-400/30 transition-all">
                            {site.name[0]}
                        </span>
                                        </div>
                                    )}
                                    {/* Dark Overlay on Hover */}
                                    <div
                                        className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                </div>

                                <div className={`p-5 ${lang === 'he' ? 'text-right' : 'text-left'}`}>
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

            {/* FOOTER - RESTRUCTURED */}
            <footer id="contact-section" className="bg-black text-white py-20 px-6 border-t border-blue-900/30">
                <div className="max-w-6xl mx-auto">

                    {/* Header Slogan from Content.js */}
                    <div className="text-center mb-16">
                        <p className="text-3xl md:text-5xl font-black italic tracking-tighter text-blue-500 uppercase">
                            {t.footerSlogan}
                        </p>
                        <p className="text-slate-500 font-mono text-xs mt-4 uppercase tracking-[0.4em]">
                            {t.footerSub}
                        </p>
                    </div>

                    {/* Two Columns Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-slate-900 pt-16">

                        {/* COLUMN 2: CIE DETAILS */}
                        <div className={`flex flex-col justify-center ${lang === 'he' ? 'text-right' : 'text-left'}`}>
                            <h3 className="text-2xl font-black mb-6 text-cyan-400 uppercase tracking-tight">
                                {t.cieTitle}
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">Company
                                        Name</p>
                                    <p className="text-xl font-bold text-white">Yelotag Cie</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">Address</p>
                                    <p className="text-lg text-slate-300">
                                        קויפמן יחזקאל 15<br/>
                                        ירושלים 9375918
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">Direct
                                        Line</p>
                                    <a href="tel:0545665417"
                                       className="text-2xl font-black text-blue-400 hover:text-white transition-colors">
                                        054-5665417
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 1: CONTACT US */}
                        {/* COLUMN 1: CONTACT US */}
                        <div className="bg-[#0f172a]/50 p-8 rounded-2xl border border-slate-800 shadow-xl">
                            <h3 className="text-2xl font-black mb-6 text-white uppercase tracking-tight">
                                {t.contactTitle}
                            </h3>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder={lang === 'he' ? 'שם מלא' : 'Full Name'}
                                        className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none text-white w-full"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder={lang === 'he' ? 'אימייל' : 'Email'}
                                        className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none text-white w-full"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <textarea
                                    rows="3"
                                    placeholder={lang === 'he' ? 'הודעה' : 'Message'}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none text-white"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    required
                                ></textarea>
                                <button type="submit"
                                        className="w-full bg-blue-600 hover:bg-cyan-500 text-white font-black py-3 rounded-lg transition-all uppercase tracking-widest text-xs">
                                    {t.sendBtn}
                                </button>
                            </form>
                        </div>

                    </div>

                    <div className="mt-20 pt-8 border-t border-slate-900 text-center">
                        <div className="text-[10px] opacity-30 font-mono uppercase tracking-[0.2em]">
                            © {new Date().getFullYear()} {t.title} • Yelotag Cie
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;