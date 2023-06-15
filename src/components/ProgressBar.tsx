import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'

function App() {
  const [progressLength, setProgressLength] = useState(15)
  const [totalValue, setTotalValue] = useState(100)
  const [currentValue, setCurrentValue] = useState(20)
  const [startChar, setStartChar] = useState('★')
  const [endChar, setEndChar] = useState('✩')

  const updateProgressLength = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!value || +value === 0) return
    setProgressLength(+value)
  }
  const updateCurrentValue = (e: ChangeEvent<HTMLInputElement>) => setCurrentValue(+e.target.value)
  const updateTotalValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!value || +value === 0) return
    setTotalValue(+value)
  }
  const updateStartChar = (e: ChangeEvent<HTMLInputElement>) => setStartChar(e.target.value)
  const updateEndChar = (e: ChangeEvent<HTMLInputElement>) => setEndChar(e.target.value)

  useEffect(() => {
    setCurrentValue(0)
  }, [totalValue])

  function mapValueToPregress() {
    const startCount = Math.floor((currentValue / totalValue) * progressLength)
    const endCount = progressLength - startCount
    return `${Array(startCount).fill(startChar).join('')}${Array(endCount).fill(endChar).join('')}`
  }

  const showValue = () => `${Math.floor((currentValue / totalValue) * 100)} %`

  return (
    <>
      <h3>Progress bar</h3>
      <div className="card">
        <label>Total value: </label>
        <input type="text" value={totalValue} onChange={updateTotalValue} />
      </div>
      <div className="card">
        <label>Current value: </label>
        <input type="range" max={totalValue} min="0" step="1" value={currentValue} onChange={updateCurrentValue} />
        <span>{currentValue}</span>
      </div>
      <div className="card">
        <div>
          <label>Start Char: </label>
          <input type="text" value={startChar} onChange={updateStartChar} />
        </div>
        <div>
          <label>End Char: </label>
          <input type="text" value={endChar} onChange={updateEndChar} />
        </div>
      </div>
      <div className="card">
        <label>Progress length: </label>
        <input type="number" value={progressLength} onChange={updateProgressLength} />
      </div>
      <div className="card">
        <div>Output</div>
        <div>{showValue()}</div>
        <div>{mapValueToPregress()}</div>
      </div>
    </>
  )
}

export default App
