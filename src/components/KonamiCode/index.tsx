import { useState, useEffect } from 'react'
import { SimpleToast, ToastSuccess } from '../../components/Toast'

// konami codes
const konamiCodeString = 'ArrowLeft,ArrowLeft,ArrowRight,ArrowRight,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,a,b'
const benbenCodeString = 'b,e,n,b,e,n'
const peterCodeString = 'p,e,t,e,r'
const notionCodeString = 'n,o,t,i,o,n'

function KonamiCode() {
  const [isShow, setIsShow] = useState(false)
  const [currentKonami, setCurrentKonami] = useState<JSX.Element>(<></>)
  const [currentKeyArray, setCurrentKeyArray] = useState<string[]>([])

  function onKeyDown(e: globalThis.KeyboardEvent): void {
    console.log(e)
    const key = e.key
    const keyArray = [...currentKeyArray, key]
    setCurrentKeyArray(keyArray)
  }

  function showEffect() {
    setCurrentKeyArray([])
    SimpleToast.success('notify.alert.konamiSuccess')
    setTimeout(() => {
      setIsShow(true)
    }, 2000)
    setTimeout(() => {
      setIsShow(false)
    }, 6000)
  }

  function getCurrentKonami(code: string) {
    switch (code) {
      case notionCodeString:
        setCurrentKonami(<div className="animate-character">♥ Notion ♥</div>)
        break
      case konamiCodeString:
        setCurrentKonami(<div className="animate-character">Inspired by Konami code</div>)
        break
      case benbenCodeString:
        setCurrentKonami(
          <div>
            <h3 className="text-xl my-4">
              Thank, <span className="animate-character">Benben</span>
            </h3>
            <img
              className="rounded-lg konami-img"
              src="https://avatars.githubusercontent.com/u/61361198?s=320&v=4"
              alt="benben"
            />
          </div>,
        )
        break
      case peterCodeString:
        setCurrentKonami(
          <div>
            <h3 className="text-xl my-4">
              Thank, <span className="animate-character">Peter</span>
            </h3>
            <img
              className="rounded-lg konami-img"
              src="https://avatars.githubusercontent.com/u/30005366?s=320&v=4"
              alt="benben"
            />
          </div>,
        )
        break
      default:
        setCurrentKonami(<div>Konami code</div>)
        break
    }
  }

  useEffect(() => {
    console.log(currentKeyArray)
    if (!currentKeyArray.length) return
    const codeString = currentKeyArray.join(',')

    if (codeString.includes(konamiCodeString)) {
      getCurrentKonami(konamiCodeString)
      showEffect()
    }
    if (codeString.includes(notionCodeString)) {
      getCurrentKonami(notionCodeString)
      showEffect()
    }
    if (codeString.includes(benbenCodeString)) {
      getCurrentKonami(benbenCodeString)
      showEffect()
    }
    if (codeString.includes(peterCodeString)) {
      getCurrentKonami(peterCodeString)
      showEffect()
    }
  }, [currentKeyArray])
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  })

  return (
    <>
      <div>
        <section className="fixed top-20 w-full flex justify-center z-10">
          {ToastSuccess('notify.alert.konamiSuccess')}
        </section>

        <div className={`cover-wrap ${isShow ? 'is-show' : 'hidden'}`}>{currentKonami}</div>
      </div>
    </>
  )
}

export default KonamiCode
