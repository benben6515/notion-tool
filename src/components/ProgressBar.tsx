import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import '../i18n/config'
import { useTranslation } from 'react-i18next'
import { useCopy } from '../hooks/useCopy'
import type { CustomFlowbiteTheme } from 'flowbite-react'
import { Button, TextInput } from 'flowbite-react'
import LabelTooltip from './Tooltips/LabelTooltip'

const columClass = 'py-4 w-full flex justify-between space-x-4'
const customTheme: CustomFlowbiteTheme['textInput'] = {
  field: {
    input: {
      colors: {
        gray: 'dark:bg-[#3B3B3B] focus:dark:border-[#555555]',
      },
    },
  },
}

function App() {
  const { t } = useTranslation()
  const { copyContent } = useCopy()
  const [totalValueName, setTotalValueName] = useState(t('fields.totalValue'))
  const [currentValueName, setCurrentValueName] = useState(t('fields.currentValue'))
  const [progressLength, setProgressLength] = useState('15')
  const [totalValue, setTotalValue] = useState('100')
  const [currentValue, setCurrentValue] = useState('20')
  const [startChar, setStartChar] = useState('★')
  const [endChar, setEndChar] = useState('☆')
  const [templateText, setTemplateText] = useState('')
  const [isStartCharListExpand, setIsStartCharListExpand] = useState(false)

  const updateCurrentValueName = (e: ChangeEvent<HTMLInputElement>) => setCurrentValueName(e.target.value)
  const updateTotalValueName = (e: ChangeEvent<HTMLInputElement>) => setTotalValueName(e.target.value)
  const updateCurrentValue = (e: ChangeEvent<HTMLInputElement>) => setCurrentValue(e.target.value)
  const updateTotalValue = (e: ChangeEvent<HTMLInputElement>) => setTotalValue(e.target.value)
  const updateProgressLength = (e: ChangeEvent<HTMLInputElement>) => setProgressLength(e.target.value)
  const updateStartChar = (e: ChangeEvent<HTMLInputElement>) => setStartChar(e.target.value)
  const updateEndChar = (e: ChangeEvent<HTMLInputElement>) => setEndChar(e.target.value)

  useEffect(() => {
    setTotalValueName(t('fields.totalValue'))
    setCurrentValueName(t('fields.currentValue'))
  }, [t])

  useEffect(() => {
    if (+totalValue < +currentValue) setCurrentValue(totalValue)
  }, [totalValue])

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

  useEffect(() => {
    const startString = Array(+progressLength).fill(startChar).join('')
    const endString = Array(+progressLength).fill(endChar).join('')
    const text = `if(prop("${currentValueName}") / prop("${totalValueName}") >= 1, "✅", slice("${startString}", 0, floor(prop("${currentValueName}") / prop("${totalValueName}") * ${progressLength}))
+ slice("${endString}", 0, ceil(${progressLength} - prop("${currentValueName}") / prop("${totalValueName}") * ${progressLength}))
+ " " + format(floor(prop("${currentValueName}") / prop("${totalValueName}") * 100)) + "%")
`
    setTemplateText(text)
  }, [progressLength, startChar, endChar, currentValueName, totalValueName])

  // function showOutput() {
  //   const startString = Array(+progressLength).fill(startChar).join('')
  //   const endString = Array(+progressLength).fill(endChar).join('')
  //   console.log(startString, endString)
  //   let currentText = `
  //     if(prop("${currentValueName}") / prop("${totalValueName}") >= 1, "✅", slice("${startString}", 0, floor(prop("${currentValueName}") / prop("${totalValueName}") * ${progressLength}))
  //     + slice("${endString}", 0, ceil(${progressLength} - prop("${currentValueName}") / prop("${totalValueName}") * ${progressLength}))
  //     + " " + format(floor(prop("${currentValueName}") / prop("${totalValueName}") * 100)) + "%")
  //   `
  //   return currentText
  // }

  async function onClickOutput() {
    console.log('click')
    await copyContent(templateText)
  }

  function onCharExpand() {
    setIsStartCharListExpand(!isStartCharListExpand)
  }

  return (
    <>
      <section className="w-full">
        <h3 className="text-teal-500 text-2xl font-bold">{t('progressBar')}</h3>

        <div className={columClass}>
          <label>{t('fields.totalValueName')}</label>
          <TextInput theme={customTheme} type="text" value={totalValueName} min="1" onChange={updateTotalValueName} />
        </div>
        <div className={columClass}>
          <label>{t('fields.currentValueName')}</label>
          <TextInput
            theme={customTheme}
            type="text"
            value={currentValueName}
            min="1"
            onChange={updateCurrentValueName}
          />
        </div>

        <div className={columClass}>
          <label>{t('fields.startChar')}</label>
          <div>
            <div className="flex justify-end">
              {/* TODO: 3-buttons group here */}
              <TextInput
                theme={customTheme}
                type="text"
                value={startChar}
                onChange={updateStartChar}
                placeholder="Enter manually"
              />
            </div>
            <div className="my-2 flex items-center cursor-pointer" onClick={onCharExpand}>
              <div className={`flex mr-2 transform ${isStartCharListExpand ? 'rotate-90' : ''}`}>
                <svg
                  className="w-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  />
                </svg>
              </div>
              <span>more default characters</span>
            </div>
            {isStartCharListExpand ? <div>TODO: buttons group here</div> : null}
          </div>
        </div>

        <div className={columClass}>
          <label>{t('fields.endChar')}</label>
          <TextInput theme={customTheme} type="text" value={endChar} onChange={updateEndChar} />
        </div>

        <div className={columClass}>
          <label className="flex items-center">
            <span>{t('fields.progressLength')}</span>
            <span className="flex ml-1">{LabelTooltip(t('fields.progressLengthTip'))}</span>
          </label>
          <TextInput theme={customTheme} type="number" value={progressLength} min="1" onChange={updateProgressLength} />
        </div>
        <hr />

        <div className={columClass}>
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
            <span>{showValue()}</span> | {mapValueToProgress()}
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
      </section>
    </>
  )
}

export default App
