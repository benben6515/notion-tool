import { useTranslation } from 'react-i18next'

export default function AppFooter() {
  const { t } = useTranslation()
  return (
    <footer className="flex justify-center full-width bg-slate-700 p-2">
      <div className="relative mr-2">
        <div className="breath_effect__inner">😊</div>
        <div className="breath_effect__outer">😊</div>
      </div>
      <a
        className="text-slate-400 hover:text-slate-200 transition-300"
        href="https://github.com/benben6515/notion-tool"
        target="_blank"
      >
        {t('giveUsStar')}
      </a>
      <div className="relative ml-2">
        <div className="breath_effect__inner">⭐</div>
        <div className="breath_effect__outer">⭐</div>
      </div>
    </footer>
  )
}
