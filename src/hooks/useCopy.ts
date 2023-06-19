export const useCopy = () => {
  const copyContent = async (text: string) => {
    const toastSuccess = document.querySelector('#notify-alert-copySuccess')
    const toastDanger = document.querySelector('#notify-alert-copyError')
    try {
      await navigator.clipboard.writeText(text)
      toastSuccess?.classList.remove('hidden')
      setTimeout(function () {
        toastSuccess?.classList.add('hidden')
      }, 2000)
      console.log('Content copied to clipboard')
    } catch (err) {
      toastDanger?.classList.remove('hidden')
      setTimeout(function () {
        toastDanger?.classList.add('hidden')
      }, 2000)
      console.error('Failed to copy: ', err)
    }
  }

  return {
    copyContent,
  }
}
