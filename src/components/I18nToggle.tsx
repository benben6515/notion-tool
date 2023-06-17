import { useState } from 'react'
import i18n from 'i18next'
import '../i18n/config'
import { useTranslation } from 'react-i18next'

function I18nToggle() {
  const { t } = useTranslation()
  const [isLocaleEn, setIsLocaleEn] = useState(true)
  const updateIsLocaleEn = () => {
    isLocaleEn ? i18n.changeLanguage('en') : i18n.changeLanguage('zh_TW')
    setIsLocaleEn(!isLocaleEn)
  }

  return (
    <>
      <section className="border rounded-sm flex justify-center p-2 w-48">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={isLocaleEn} onChange={updateIsLocaleEn} className="sr-only w-0 peer" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Language:</span>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{t('translateSwitch')}</span>
        </label>
      </section>
    </>
  )
}

export default I18nToggle
