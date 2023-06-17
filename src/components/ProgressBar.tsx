import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import '../i18n/config'
import { useTranslation } from 'react-i18next'

const columClass = 'py-4 w-full flex justify-between space-x-4'

function App() {
  const { t } = useTranslation()
  const [progressLength, setProgressLength] = useState('15')
  const [totalValue, setTotalValue] = useState('100')
  const [currentValue, setCurrentValue] = useState('20')
  const [startChar, setStartChar] = useState('★')
  const [endChar, setEndChar] = useState('✩')

  const updateProgressLength = (e: ChangeEvent<HTMLInputElement>) => setProgressLength(e.target.value)
  const updateCurrentValue = (e: ChangeEvent<HTMLInputElement>) => setCurrentValue(e.target.value)
  const updateTotalValue = (e: ChangeEvent<HTMLInputElement>) => setTotalValue(e.target.value)
  const updateStartChar = (e: ChangeEvent<HTMLInputElement>) => setStartChar(e.target.value)
  const updateEndChar = (e: ChangeEvent<HTMLInputElement>) => setEndChar(e.target.value)

  useEffect(() => {
    if (+totalValue < +currentValue) setCurrentValue(totalValue)
  }, [totalValue])

  function mapValueToPregress() {
    if (+currentValue < 0) return
    if (+totalValue <= 0) return
    const startCount = Math.floor((+currentValue / +totalValue) * +progressLength)
    const endCount = +progressLength - +startCount
    if (startCount < 0 || endCount < 0) return
    return `${Array(startCount).fill(startChar).join('')}${Array(endCount).fill(endChar).join('')}`
  }

  function showValue() {
    if (+currentValue < 0) return
    if (+totalValue <= 0) return
    return `${Math.floor((+currentValue / +totalValue) * 100)} %`
  }

  return (
    <>
      <section className="w-full">
        <h3 className="text-teal-500 text-lg font-bold">{t('progressBar')}</h3>

        <div className={columClass}>
          <label>Total value: </label>
          <input type="number" value={totalValue} min="1" onChange={updateTotalValue} />
        </div>
        <div className={columClass}>
          <label>Current value: </label>
          <input type="range" max={totalValue} min="0" step="1" value={currentValue} onChange={updateCurrentValue} />
          <span className="w-6">{currentValue}</span>
        </div>
        <div className={columClass}>
          <label>Start Char: </label>
          <input type="text" value={startChar} onChange={updateStartChar} />
        </div>
        <div className={columClass}>
          <label>End Char: </label>
          <input type="text" value={endChar} onChange={updateEndChar} />
        </div>
        <div className={columClass}>
          <label>Progress length: </label>
          <input type="number" value={progressLength} min="1" onChange={updateProgressLength} />
        </div>

        <div className={columClass}>
          <div>
            Preview: <span>{showValue()}</span>
          </div>
        </div>
        <div className={columClass}>
          <div>{mapValueToPregress()}</div>
        </div>
      </section>
    </>
  )
}

export default App
