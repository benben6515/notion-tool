import { SimpleToast } from '../components/Toast'

export const useCopy = () => {
  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      SimpleToast.success('notify.alert.copySuccess')
      // console.log('Content copied to clipboard')
    } catch (err) {
      SimpleToast.error('notify.alert.copyError')
      // console.error('Failed to copy: ', err)
    }
  }

  return {
    copyContent,
  }
}
