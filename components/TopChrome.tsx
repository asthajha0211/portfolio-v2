'use client';

interface TopChromeProps {
  section: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNav: (key: string) => void;
  barFade: boolean;
  showTopBar: boolean;
}

const NAV_ITEMS = ['home', 'work', 'about', 'contact'];

export default function TopChrome({
  section,
  menuOpen,
  onToggleMenu,
  onNav,
  barFade,
  showTopBar,
}: TopChromeProps) {
  return (
    <>
      {/* White top bar */}
      {showTopBar && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '76px',
            background: '#fff',
            borderBottom: '1px solid #000',
            zIndex: 18,
          }}
        />
      )}

      {/* [explore] toggle */}
      <button
        onClick={onToggleMenu}
        className="border-0 bg-transparent p-0 cursor-pointer"
        style={{
          position: 'fixed',
          left: '40px',
          top: '38px',
          zIndex: 21,
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          letterSpacing: '1.5px',
          color: '#8a8a8a',
          transition: 'opacity 0.25s ease, color 0.15s ease',
          opacity: menuOpen || barFade ? 0 : 1,
          pointerEvents: menuOpen || barFade ? 'none' : 'auto',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#000')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a8a')}
      >
        [explore]
      </button>

      {/* Nav */}
      <nav
        style={{
          position: 'fixed',
          left: '40px',
          top: '34px',
          zIndex: 22,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: '22px',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: menuOpen && !barFade ? 1 : 0,
          transform: `translateY(${menuOpen ? 0 : -6}px)`,
          pointerEvents: menuOpen && !barFade ? 'auto' : 'none',
        }}
      >
        {NAV_ITEMS.map((key) => {
          const isActive = key === section;
          return (
            <button
              key={key}
              onClick={() => onNav(key)}
              className="border-0 bg-transparent p-0 cursor-pointer"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: isActive ? '15px' : '12px',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.5px',
                color: isActive ? '#000' : '#8a8a8a',
                textDecoration: 'none',
                transition: 'transform 0.15s ease, font-size 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              [{key}]
            </button>
          );
        })}
      </nav>

      {/* [resume] link */}
      <button
        onClick={() => onNav('resume')}
        className="border-0 bg-transparent p-0 cursor-pointer"
        style={{
          position: 'fixed',
          right: '40px',
          top: '38px',
          zIndex: 21,
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          letterSpacing: '1.5px',
          color: '#8a8a8a',
          transition: 'opacity 0.25s ease, color 0.15s ease',
          opacity: barFade ? 0 : 1,
          pointerEvents: barFade ? 'none' : 'auto',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#000')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a8a')}
      >
        [resume]
      </button>
    </>
  );
}
