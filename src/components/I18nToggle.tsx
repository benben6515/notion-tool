import { useState } from 'react'
import i18n from 'i18next'
import '../i18n/config'
import { useTranslation } from 'react-i18next'
import { Button } from 'flowbite-react'

function I18nToggle() {
  const { t } = useTranslation()
  const [isLocaleEn, setIsLocaleEn] = useState(true)
  const updateIsLocaleEn = () => {
    setIsLocaleEn(!isLocaleEn)
    isLocaleEn ? i18n.changeLanguage('en') : i18n.changeLanguage('zh_TW')
  }

  return (
    <>
      <section className="flex justify-center p-2 w-24">
        <Button color="gray" onClick={updateIsLocaleEn}>
          <div className="flex">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
              ></path>
            </svg>
          </div>
        </Button>
      </section>
    </>
  )
}

export default I18nToggle
