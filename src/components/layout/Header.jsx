export default function Header() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="px-8 py-3 flex items-center gap-8 rounded-full"
        style={{
          background: 'rgba(242, 242, 240, 0.72)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {/* Logo */}
        <a href="/" className="font-display text-xl tracking-tight select-none">
          D<span className="text-[var(--accent)]">/</span>A
        </a>

        {/* Nav Links — desktop */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
          {['Inicio', 'Sobre', 'Blog', 'Contato'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
