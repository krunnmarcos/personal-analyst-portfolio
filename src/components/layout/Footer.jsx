export default function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} Marcos Irenos · Feito com React
        </p>
      </div>
    </footer>
  )
}
