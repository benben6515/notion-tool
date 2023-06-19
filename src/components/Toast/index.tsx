import ToastSuccess from './ToastSuccess'
import ToastDanger from './ToastDanger'

const SimpleToast = {
  success: (i18nKey: string) => {
    const toastSuccess = document.querySelector('#' + i18nKey.replace(/\./g, '-'))
    toastSuccess?.classList.remove('hidden')
    setTimeout(function () {
      toastSuccess?.classList.add('hidden')
    }, 2000)
  },
  error: (i18nKey: string) => {
    const toastDanger = document.querySelector('#' + i18nKey.replace(/\./g, '-'))
    toastDanger?.classList.remove('hidden')
    setTimeout(function () {
      toastDanger?.classList.add('hidden')
    }, 2000)
  },
}

export { ToastSuccess, ToastDanger, SimpleToast }
