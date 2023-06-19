import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import '../../i18n/config'
import { useTranslation } from 'react-i18next'
import { useCopy } from '../../hooks/useCopy'
import { TextInput } from 'flowbite-react'
import LabelTooltip from '../Tooltips/LabelTooltip'
import { columClass, customTheme } from './ProgressBar'

interface TypeBarPropsType {
  progressLength: string
  startChar: string
  endChar: string
  currentValueName: string
  totalValueName: string
}

// TODO add slide type
function TypeSlide({ progressLength, startChar, endChar, currentValueName, totalValueName }: TypeBarPropsType) {
  const { t } = useTranslation()
  const { copyContent } = useCopy()

  const [totalValue, setTotalValue] = useState('100')
  const [currentValue, setCurrentValue] = useState('20')
  const [templateText, setTemplateText] = useState('')

  const updateCurrentValue = (e: ChangeEvent<HTMLInputElement>) => setCurrentValue(e.target.value)
  const updateTotalValue = (e: ChangeEvent<HTMLInputElement>) => setTotalValue(e.target.value)

  useEffect(() => {
    if (+totalValue < +currentValue) setCurrentValue(totalValue)
  }, [totalValue])

  useEffect(() => {
    const startString = Array(+progressLength).fill(startChar).join('')
    const endString = Array(+progressLength).fill(endChar).join('')
    const text = `if(prop("${currentValueName}") / prop("${totalValueName}") >= 1, "✅", slice("${startString}", 0, floor(prop("${currentValueName}") / prop("${totalValueName}") * ${progressLength}))
+ slice("${endString}", 0, ceil(${progressLength} - prop("${currentValueName}") / prop("${totalValueName}") * ${progressLength}))
+ " " + format(floor(prop("${currentValueName}") / prop("${totalValueName}") * 100)) + "%")
`
    setTemplateText(text)
  }, [progressLength, startChar, endChar, currentValueName, totalValueName])

  function mapValueToProgress() {
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

  async function onClickOutput() {
    console.log('click')
    await copyContent(templateText)
  }

  return (
    <>
      <div>
        <div className="text-teal-500 text-lg font-bold">{t('fields.preview')}</div>
      </div>
      <div className="w-full flex justify-between space-x-4">
        <label>{t('fields.totalValue')}</label>
        <TextInput theme={customTheme} type="number" value={totalValue} min="1" onChange={updateTotalValue} />
      </div>
      <div className="py-4 w-full flex justify-between space-x-4">
        <label>{t('fields.currentValue')}</label>
        <span className="flex items-center">
          <span className="w-6 mx-4">{currentValue}</span>
          <input type="range" max={totalValue} min="0" step="1" value={currentValue} onChange={updateCurrentValue} />
        </span>
      </div>
      <div className={columClass}>
        <div>
          {mapValueToProgress()} | <span>{showValue()}</span>
        </div>
      </div>

      <div className="text-teal-500 text-lg font-bold flex items-center">
        <p>{t('fields.output')}</p>
        <span className="flex ml-1 text-teal-500">{LabelTooltip(t('fields.outputTip'))}</span>
      </div>
      <div className={columClass}>
        <button
          onClick={onClickOutput}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <p className="font-normal text-gray-700 dark:text-gray-400 text-start">{templateText}</p>
        </button>
      </div>
    </>
  )
}

export default TypeSlide
