import { useState, useEffect } from 'react'
import type { ChangeEvent, ChangeEventHandler } from 'react'
import '../../i18n/config'
import { useTranslation } from 'react-i18next'
import type { CustomFlowbiteTheme } from 'flowbite-react'
import { TextInput, Select, ToggleSwitch } from 'flowbite-react'

import LabelTooltip from '../Tooltips/LabelTooltip'
import TypeBar from './TypeBar'
import TypeSlide from './TypeSlide'
import type { TYPE_OPTIONS_MAP_TYPE } from './types'

export const columClass = 'py-3 w-full flex justify-between space-x-4 lg:mx-md'
export const customTheme: CustomFlowbiteTheme['textInput'] = {
  field: {
    input: {
      colors: {
        gray: 'dark:bg-[#3B3B3B] focus:dark:border-[#555555]',
      },
    },
  },
}

const extendStartCharList = ['★', '✦', '●', '☑', '✱', '■', '◆']
const extendEndCharList = ['☆', '✧', '○', '☐', '⁎', '□', '◇']
const extendDoneCharList = ['✅', '👍', '🏁', '☑', '✔', '✓']

const TYPE_OPTIONS_MAP: TYPE_OPTIONS_MAP_TYPE = {
  simpleBar: {
    label: 'Simple Bar',
    value: 'simpleBar',
  },
  fullBar: {
    label: 'Full Bar',
    value: 'fullBar',
  },
  slide: {
    label: 'Slide',
    value: 'slide',
  },
}
const TYPE_OPTIONS = [TYPE_OPTIONS_MAP.simpleBar.value, TYPE_OPTIONS_MAP.fullBar.value, TYPE_OPTIONS_MAP.slide.value]

function App() {
  const { t } = useTranslation()
  const [totalValueName, setTotalValueName] = useState(t('fields.totalValue'))
  const [currentValueName, setCurrentValueName] = useState(t('fields.currentValue'))
  const [progressLength, setProgressLength] = useState('10')
  const [startChar, setStartChar] = useState(extendStartCharList[0])
  const [endChar, setEndChar] = useState(extendEndCharList[0])
  const [doneChar, setDoneChar] = useState(extendDoneCharList[0])
  const [type, setType] = useState(TYPE_OPTIONS[0])
  const [isShowNumber, setIsShowNumber] = useState(true)

  const updateCurrentValueName = (e: ChangeEvent<HTMLInputElement>) => setCurrentValueName(e.target.value)
  const updateTotalValueName = (e: ChangeEvent<HTMLInputElement>) => setTotalValueName(e.target.value)
  const updateProgressLength = (e: ChangeEvent<HTMLInputElement>) => setProgressLength(e.target.value)
  const updateStartChar = (e: ChangeEvent<HTMLInputElement>) => setStartChar(e.target.value)
  const updateEndChar = (e: ChangeEvent<HTMLInputElement>) => setEndChar(e.target.value)
  const updateDoneChar = (e: ChangeEvent<HTMLInputElement>) => setDoneChar(e.target.value)
  const updateType = (e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)
  const updateIsShowNumber = (checked: boolean) => setIsShowNumber(checked)

  const [isStartCharListExpand, setIsStartCharListExpand] = useState(false)
  const [isEndCharListExpand, setIsEndCharListExpand] = useState(false)
  const [isDoneCharListExpand, setIsDoneCharListExpand] = useState(false)

  useEffect(() => {
    setTotalValueName(t('fields.totalValue'))
    setCurrentValueName(t('fields.currentValue'))
  }, [t])

  const componentByType = () => {
    if (!TYPE_OPTIONS_MAP?.[type]?.value) return
    switch (TYPE_OPTIONS_MAP[type].value) {
      case TYPE_OPTIONS_MAP.simpleBar.value:
      case TYPE_OPTIONS_MAP.fullBar.value:
        return (
          <TypeBar
            progressLength={progressLength}
            startChar={startChar}
            endChar={endChar}
            doneChar={doneChar}
            currentValueName={currentValueName}
            totalValueName={totalValueName}
            isShowNumber={isShowNumber}
            isFullBar={TYPE_OPTIONS_MAP[type].value === TYPE_OPTIONS_MAP.fullBar.value}
          />
        )
      case TYPE_OPTIONS_MAP.slide.value:
        return (
          <TypeSlide
            progressLength={progressLength}
            startChar={startChar}
            endChar={endChar}
            doneChar={doneChar}
            currentValueName={currentValueName}
            totalValueName={totalValueName}
            isShowNumber={isShowNumber}
          />
        )
      default:
        console.error('unknown progress type')
        return <></>
    }
  }

  function toggleListIcon(isExpanded: boolean) {
    return (
      <div className={`flex mr-2 transform ${isExpanded ? 'rotate-90' : ''}`}>
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
    )
  }

  function ButtonsGroup(onChangeHandler: ChangeEventHandler<HTMLInputElement>, charsList: string[], name: string) {
    let currentChar: string = ''
    switch (name) {
      case 'startChar':
        currentChar = startChar
        break
      case 'endChar':
        currentChar = endChar
        break
      case 'doneChar':
        currentChar = doneChar
        break
      default:
        throw new Error('unknown name')
    }
    return (
      <div className="flex h-full gap-x-1 justify-end">
        {charsList.map((char) => {
          return (
            <div key={'input' + char} className="h-full flex">
              <input
                type="radio"
                id={char}
                name={name}
                checked={char === currentChar}
                value={char}
                className="hidden peer"
                required
                onChange={onChangeHandler}
              />
              <label
                htmlFor={char}
                className="inline-flex items-center justify-between w-full h-full px-2.5 py-1 text-gray-500 bg-white border border-[#6B7280] rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-white dark:peer-checked:bg-[#666666] peer-checked:border-teal-600 dark:peer-checked:border-[#666666] peer-checked:text-teal-600 peer-checked:bg-teal-100 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-[#3B3B3B] dark:hover:bg-gray-700"
              >
                <span className="block">{char}</span>
              </label>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <section className="w-full">
        <h3 className="text-teal-500 text-2xl font-bold pb-2">{t('progressBar')}</h3>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-8">
          <div className={`${columClass}`}>
            <label className="my-2">{t('fields.totalValueName')}</label>
            <TextInput theme={customTheme} type="text" value={totalValueName} min="1" onChange={updateTotalValueName} />
          </div>

          <div className={columClass}>
            <label className="my-2">{t('fields.currentValueName')}</label>
            <TextInput
              theme={customTheme}
              type="text"
              value={currentValueName}
              min="1"
              onChange={updateCurrentValueName}
            />
          </div>

          <div>
            <div className={columClass}>
              <label className="my-2">{t('fields.startChar')}</label>
              <div>
                <div className="flex justify-end">
                  <TextInput
                    theme={customTheme}
                    type="text"
                    value={startChar}
                    onChange={updateStartChar}
                    placeholder={t('fields.enterCharacters')}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex items-center cursor-pointer justify-end"
              onClick={() => setIsStartCharListExpand(!isStartCharListExpand)}
            >
              {toggleListIcon(isStartCharListExpand)}
              <span>{t('fields.toggleCharacters')}</span>
            </div>
            {isStartCharListExpand && (
              <div className="ml-4">{ButtonsGroup(updateStartChar, extendStartCharList, 'startChar')}</div>
            )}
          </div>

          <div>
            <div className={columClass}>
              <label className="my-2">{t('fields.endChar')}</label>
              <div>
                <div className="flex justify-end">
                  <TextInput
                    theme={customTheme}
                    type="text"
                    value={endChar}
                    onChange={updateEndChar}
                    placeholder={t('fields.enterCharacters')}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex items-center cursor-pointer justify-end"
              onClick={() => setIsEndCharListExpand(!isEndCharListExpand)}
            >
              {toggleListIcon(isEndCharListExpand)}
              <span>{t('fields.toggleCharacters')}</span>
            </div>
            {isEndCharListExpand && (
              <div className="ml-4">{ButtonsGroup(updateEndChar, extendEndCharList, 'endChar')}</div>
            )}
          </div>

          <div>
            <div className={columClass}>
              <label className="my-2">{t('fields.doneChar')}</label>
              <div>
                <div className="flex justify-end">
                  <TextInput
                    theme={customTheme}
                    type="text"
                    value={doneChar}
                    onChange={updateDoneChar}
                    placeholder={t('fields.enterCharacters')}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex items-center cursor-pointer justify-end"
              onClick={() => setIsDoneCharListExpand(!isDoneCharListExpand)}
            >
              {toggleListIcon(isDoneCharListExpand)}
              <span>{t('fields.toggleCharacters')}</span>
            </div>
            {isDoneCharListExpand && (
              <div className="ml-4">{ButtonsGroup(updateDoneChar, extendDoneCharList, 'doneChar')}</div>
            )}
          </div>

          <div className={columClass}>
            <label className="my-2">
              <span>{t('fields.progressLength')}</span>
              <span className="ml-1">{LabelTooltip(t('fields.progressLengthTip'))}</span>
            </label>
            <TextInput
              theme={customTheme}
              type="number"
              value={progressLength}
              min="1"
              onChange={updateProgressLength}
            />
          </div>

          <div className="py-4 w-full flex items-center space-x-0 lg:col-span-2 flex-wrap">
            <div className="flex justify-start items-center space-x-4 mr-2">
              <label className="flex items-center">
                <span>{t('fields.progressType')}</span>
              </label>
              <Select theme={customTheme} value={type} onChange={updateType}>
                {TYPE_OPTIONS.map((e: keyof TYPE_OPTIONS_MAP_TYPE) => (
                  <option key={e} value={e}>
                    {TYPE_OPTIONS_MAP?.[e]?.label}
                  </option>
                ))}
              </Select>
              <span> | </span>
            </div>

            <div className="flex justify-start items-center">
              <label className="flex items-center mr-4">
                <span>{t('fields.isShowNumber')}</span>
              </label>
              <ToggleSwitch label={''} checked={isShowNumber} defaultChecked onChange={updateIsShowNumber} />
              <span>| </span>
            </div>
          </div>
        </div>

        <hr />

        {componentByType()}
      </section>
    </>
  )
}

export default App
