import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const tiles = [
  {
    img: '/storybook/tile-kids.png',
    title: 'Voor de kleinsten',
    text: 'Kruiwagenraces in de tuin, sterren spotten op het terras.',
  },
  {
    img: '/storybook/tile-fireplace.png',
    title: 'Voor de avond',
    text: 'Een lange tafel, een glas, en het kraken van een houtvuur.',
  },
  {
    img: '/storybook/tile-forest.png',
    title: 'Voor wie buiten wil',
    text: 'Bossen en paden vlak voor de deur — wandel, fiets, adem.',
  },
];

const StorybookPreview = () => {
  // Noindex this preview route — append meta and clean up on unmount
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div
      className="min-h-screen text-storybook-ink"
      style={{ fontFamily: "'Lora', serif", backgroundColor: '#FBF6EC' }}
    >
      {/* Dust particle animation keyframes — scoped via style tag */}
      <style>{`
        @keyframes storybook-dust {
          0%   { transform: translate3d(0,0,0); opacity: 0; }
          10%  { opacity: 0.7; }
          100% { transform: translate3d(20vw,-110vh,0); opacity: 0; }
        }
        .storybook-dust span {
          position: absolute;
          bottom: -10px;
          width: 4px; height: 4px;
          background: rgba(255, 240, 200, 0.8);
          border-radius: 9999px;
          filter: blur(0.5px);
          animation: storybook-dust linear infinite;
        }
      `}</style>

      {/* 1. Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/storybook/hero.png"
          alt="Storybook illustratie van een stenen boerderij in de Ardennen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Warm overlay gradient for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(251,246,236,0.15) 0%, rgba(251,246,236,0) 40%, rgba(251,246,236,0.85) 100%)',
          }}
        />
        {/* Dust particles */}
        <div className="storybook-dust pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 4.2) % 100}%`,
                animationDuration: `${14 + (i % 8) * 2}s`,
                animationDelay: `${(i % 10) * 1.4}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1
            className="text-storybook-ink mb-4"
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 700,
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              lineHeight: 1,
              textShadow: '0 2px 12px rgba(251,246,236,0.5)',
            }}
          >
            ArdenNest
          </h1>
          <p
            className="text-storybook-bark mb-8 italic"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
          >
            Een huis met verhalen, midden in de Ardennen
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-full bg-storybook-moss text-storybook-cream hover:bg-storybook-bark transition-colors duration-300 shadow-lg"
            style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem' }}
          >
            Boek je verblijf
          </Link>
        </div>
      </section>

      {/* 2. Verhaal-intro */}
      <section
        className="py-32 px-6 relative"
        style={{
          backgroundImage: "url('/storybook/paper-texture.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-storybook-moss mb-8"
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.1,
            }}
          >
            Een plek waar tijd anders loopt
          </h2>
          <p
            className="text-storybook-ink leading-relaxed"
            style={{ fontSize: '1.15rem' }}
          >
            ArdenNest is een vakantiehuis voor families en vrienden, weggestopt
            tussen de heuvels van de Belgische Ardennen. Geen wifi-hokjes, geen
            schermen op tafel — wel een stenen haard, een lange eetkamer, en
            achter het raam: bossen die kraken in de wind en sterren die je écht
            ziet.
          </p>
        </div>
      </section>

      {/* 3. Drie illustration-tegels */}
      <section className="py-24 px-6 bg-storybook-cream-deep">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {tiles.map((tile) => (
            <article key={tile.title} className="text-center">
              <img
                src={tile.img}
                alt={tile.title}
                width={400}
                height={400}
                loading="lazy"
                className="w-48 h-48 md:w-56 md:h-56 mx-auto mb-6 rounded-full object-cover shadow-md"
                style={{ background: '#FBF6EC' }}
              />
              <h3
                className="text-storybook-moss mb-3"
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontWeight: 700,
                  fontSize: '2rem',
                  lineHeight: 1,
                }}
              >
                {tile.title}
              </h3>
              <p className="text-storybook-ink/80" style={{ fontSize: '1rem' }}>
                {tile.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-storybook-cream border-t border-storybook-cream-deep py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-storybook-bark">
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem' }}>
            ArdenNest
          </div>
          <div className="text-center">
            ardennest.be · Rue de la Ferme 3, 5575 Gedinne
          </div>
          <Link to="/" className="hover:text-storybook-moss transition-colors">
            ← Terug naar gewone site
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default StorybookPreview;
