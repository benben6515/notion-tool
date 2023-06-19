import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import '../../i18n/config'
import { useTranslation } from 'react-i18next'
import type { CustomFlowbiteTheme } from 'flowbite-react'
import { TextInput, Select } from 'flowbite-react'

import LabelTooltip from '../Tooltips/LabelTooltip'
import TypeBar from './TypeBar'
import TypeSlide from './TypeSlide'
import type { TYPE_OPTIONS_MAP_TYPE } from './types'

export const columClass = 'py-4 w-full flex justify-between space-x-4'
export const customTheme: CustomFlowbiteTheme['textInput'] = {
  field: {
    input: {
      colors: {
        gray: 'dark:bg-[#3B3B3B] focus:dark:border-[#555555]',
      },
    },
  },
}

const TYPE_OPTIONS_MAP: TYPE_OPTIONS_MAP_TYPE = {
  bar: {
    label: 'Bar',
    value: 'bar',
  },
  slide: {
    label: 'Slide',
    value: 'slide',
  },
}
const TYPE_OPTIONS = [TYPE_OPTIONS_MAP.bar.value, TYPE_OPTIONS_MAP.slide.value]

function App() {
  const { t } = useTranslation()
  const [totalValueName, setTotalValueName] = useState(t('fields.totalValue'))
  const [currentValueName, setCurrentValueName] = useState(t('fields.currentValue'))
  const [progressLength, setProgressLength] = useState('15')
  const [startChar, setStartChar] = useState('★')
  const [endChar, setEndChar] = useState('☆')
  const [type, setType] = useState(TYPE_OPTIONS[0])

  const updateCurrentValueName = (e: ChangeEvent<HTMLInputElement>) => setCurrentValueName(e.target.value)
  const updateTotalValueName = (e: ChangeEvent<HTMLInputElement>) => setTotalValueName(e.target.value)
  const updateProgressLength = (e: ChangeEvent<HTMLInputElement>) => setProgressLength(e.target.value)
  const updateStartChar = (e: ChangeEvent<HTMLInputElement>) => setStartChar(e.target.value)
  const updateEndChar = (e: ChangeEvent<HTMLInputElement>) => setEndChar(e.target.value)
  const updateType = (e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)

  useEffect(() => {
    setTotalValueName(t('fields.totalValue'))
    setCurrentValueName(t('fields.currentValue'))
  }, [t])

  const componentByType = () => {
    switch (TYPE_OPTIONS_MAP[type].value) {
      case TYPE_OPTIONS_MAP.bar.value:
        return (
          <TypeBar
            progressLength={progressLength}
            startChar={startChar}
            endChar={endChar}
            currentValueName={currentValueName}
            totalValueName={totalValueName}
          />
        )
      case TYPE_OPTIONS_MAP.slide.value:
        return (
          <TypeSlide
            progressLength={progressLength}
            startChar={startChar}
            endChar={endChar}
            currentValueName={currentValueName}
            totalValueName={totalValueName}
          />
        )
      default:
        console.error('unknown progress type')
        return <></>
    }
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
          <TextInput theme={customTheme} type="text" value={startChar} onChange={updateStartChar} />
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
        <div className="py-4 w-full flex space-x-4">
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
        </div>
        <hr />

        {componentByType()}
      </section>
    </>
  )
}

export default App
