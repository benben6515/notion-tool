import { useTranslation } from 'react-i18next'
function ToastDanger(i18nKey: string) {
  const { t } = useTranslation()
  const id = i18nKey.replace(/\./g, '-')
  return (
    <div
      id={id}
      className="hidden w-[300px] p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 z-10"
      role="alert"
    >
      <div>
        <span className="font-medium">{t(i18nKey)}</span>
      </div>
    </div>
  )
}

export default ToastDanger
