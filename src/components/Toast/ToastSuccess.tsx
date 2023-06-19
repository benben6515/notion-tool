import { useTranslation } from 'react-i18next'

function ToastSuccess(i18nKey: string) {
  const { t } = useTranslation()
  const id = i18nKey.replace(/\./g, '-')
  return (
    <div
      id={id}
      className="hidden w-[300px] p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
      role="alert"
    >
      <div>
        <span className="font-medium">{t(i18nKey)}</span>
      </div>
    </div>
  )
}

export default ToastSuccess
