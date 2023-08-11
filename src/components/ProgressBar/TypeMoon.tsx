import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import '../../i18n/config'
import { useTranslation } from 'react-i18next'
import { useCopy } from '../../hooks/useCopy'
import { TextInput } from 'flowbite-react'
import LabelTooltip from '../Tooltips/LabelTooltip'
import { columClass, customTheme } from './ProgressBar'
import type { TypeBarPropsType } from './types'

function TypeBar({
  progressLength,
  startChar,
  endChar,
  doneChar,
  currentValueName,
  totalValueName,
  isShowNumber,
  isShowDone,
}: TypeBarPropsType) {
  const { t } = useTranslation()
  const { copyContent } = useCopy()

  const [totalValue, setTotalValue] = useState('100')
  const [currentValue, setCurrentValue] = useState('42')
  const [templateText, setTemplateText] = useState('')

  const updateCurrentValue = (e: ChangeEvent<HTMLInputElement>) => setCurrentValue(e.target.value)
  const updateTotalValue = (e: ChangeEvent<HTMLInputElement>) => setTotalValue(e.target.value)

  useEffect(() => {
    if (+totalValue < +currentValue) setCurrentValue(totalValue)
  }, [totalValue])

  useEffect(() => {
    const startString = Array(+progressLength).fill(startChar).join('')
    const endString = Array(+progressLength).fill(endChar).join('')

    const startText = `slice("${startString}", 0, floor(prop("${currentValueName}") / prop("${totalValueName}") * ${progressLength}) * ${startChar.length})`
    const endText = ` + slice("${endString}", 0, if(prop("${currentValueName}") / prop("${totalValueName}") >= 1, 0, floor(${progressLength} - prop("${currentValueName}") / prop("${totalValueName}") * ${progressLength}) * ${endChar.length}))`

    const middleText = `+ if(prop("${currentValueName}") / prop("${totalValueName}") >= 1, "", slice("🌑🌘🌗🌖🌕", floor(mod(prop("${currentValueName}") * 10, prop("${totalValueName}")) / prop("${totalValueName}") / 0.25) * 2, floor(mod(prop("${currentValueName}") * 10, prop("${totalValueName}")) / prop("${totalValueName}") / 0.25) * 2 + 2))`

    const numberText = isShowNumber
      ? `+ " | " + format(floor(prop("${currentValueName}") / prop("${totalValueName}") * 100)) + "%"`
      : ''
    const text = isShowDone
      ? `if(prop("${currentValueName}") / prop("${totalValueName}") >= 1, "${doneChar}", ${startText}${middleText}${endText}${numberText})`
      : `${startText}${middleText}${endText}${numberText}`

    setTemplateText(text)
  }, [progressLength, startChar, endChar, doneChar, currentValueName, totalValueName, isShowNumber, isShowDone])

  function mapValueToProgress() {
    if (+currentValue < 0) return
    if (+totalValue <= 0) return
    const startCount = Math.floor((+currentValue / +totalValue) * +progressLength)
    const endCount = +progressLength - +startCount
    if (startCount < 0 || endCount < 0) return
    const endText = `${Array(endCount).fill(endChar).join('')}`
    if (isShowDone && +currentValue >= +totalValue) return doneChar
    const index = Math.floor((((+currentValue / +totalValue) * 100) % 10) / 2)
    const middleText = +currentValue >= +totalValue ? '' : '🌑🌘🌗🌖🌕'.slice(index * 2, index * 2 + 2)
    return `${Array(startCount).fill(startChar).join('')}${middleText}${endText}`
  }

  function showValue() {
    if (+currentValue < 0) return
    if (+totalValue <= 0) return
    return `${Math.floor((+currentValue / +totalValue) * 100)} %`
  }

  const onClickOutput = async () => await copyContent(templateText)

  return (
    <>
      <div className="text-teal-500 text-lg font-bold py-4">{t('fields.preview')}</div>
      <div className="w-full flex justify-between space-x-4">
        <label>{totalValueName}</label>
        <TextInput theme={customTheme} type="number" value={totalValue} min="1" onChange={updateTotalValue} />
      </div>
      <div className="py-4 w-full flex justify-between space-x-4">
        <label>{currentValueName}</label>
        <span className="flex items-center">
          <span className="w-6 mx-4">{currentValue}</span>
          <input type="range" max={totalValue} min="0" step="1" value={currentValue} onChange={updateCurrentValue} />
        </span>
      </div>
      <div className={columClass}>
        <div></div>
        <div className="relative">
          <div className="break-all breath_effect__inner">
            {mapValueToProgress()}
            {isShowNumber && <span> | {showValue()}</span>}
          </div>
          <div className="break-all breath_effect__outer">
            {mapValueToProgress()}
            {isShowNumber && <span> | {showValue()}</span>}
          </div>
        </div>
      </div>

      <div className="text-teal-500 text-lg font-bold flex items-center">
        <p>{t('fields.output')}</p>
        <span className="flex ml-1 text-teal-500">{LabelTooltip(t('fields.outputTip'))}</span>
      </div>
      <div className={columClass}>
        <button
          onClick={onClickOutput}
          className="block p-6 bg-white border border-2 border-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-800 dark:border-blue-900 dark:hover:bg-gray-700 shadow-[2px_2px_10px_5px_rgba(200,200,255,0.15)]"
        >
          <p className="font-normal text-gray-800 dark:text-gray-300 text-start break-all">{templateText}</p>
        </button>
      </div>
    </>
  )
}

export default TypeBar
