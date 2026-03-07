import { useLang } from '../../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="py-8 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm text-[var(--text-muted)]">
          {t('footer.copy').replace('{year}', new Date().getFullYear())}
        </p>
      </div>
    </footer>
  )
}
