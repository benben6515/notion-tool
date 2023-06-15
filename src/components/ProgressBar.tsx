import { useState } from 'react'
import type { ChangeEvent } from 'react'

function App() {
  const [progressLength, setProgressLength] = useState(10)
  const [value, setValue] = useState(20)
  const [startChar, setStartChar] = useState('★')
  const [endChar, setEndChar] = useState('✩')

  const updateProgressLength = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!value || +value === 0) return
    setProgressLength(+value)
  }
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => setValue(+e.target.value)
  const updateStartChar = (e: ChangeEvent<HTMLInputElement>) => setStartChar(e.target.value.slice(-1))
  const updateEndChar = (e: ChangeEvent<HTMLInputElement>) => setEndChar(e.target.value.slice(-1))

  function mapValueToPregress() {
    const startCount = Math.floor(value / progressLength)
    return `${Array(startCount).fill(startChar).join('').padEnd(progressLength, endChar)}`
  }

  const showValue = () => `${value} %`

  return (
    <>
      <h3>Progress bar</h3>
      <div className="card">
        <label>Range: {progressLength} </label>
        <input type="number" value={progressLength} onChange={updateProgressLength} />
      </div>
      <div className="card">
        <label>Value: {value} </label>
        <input type="range" max="100" min="0" step="1" value={value} onChange={updateValue} />
      </div>
      <div className="card">
        <label>Start: </label>
        <input type="text" value={startChar} onChange={updateStartChar} />
      </div>
      <div className="card">
        <label>End: </label>
        <input type="text" value={endChar} onChange={updateEndChar} />
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
