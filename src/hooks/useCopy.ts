import { useTranslation } from 'react-i18next'

export const useCopy = () => {
  const { t } = useTranslation()
  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // TODO: use notify or sweet alert
      alert(t('notify.alert.copySuccess'))
      console.log('Content copied to clipboard')
    } catch (err) {
      alert(t('notify.alert.copyError'))
      console.error('Failed to copy: ', err)
    }
  }

  return {
    copyContent,
  }
}
