import { useState, useEffect } from 'react'
import { Button } from 'flowbite-react'

function DarkModeToggle() {
  // source: https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
  const isDarkSystemNow =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [isDarkMode, setIsDarkMode] = useState(isDarkSystemNow)
  const [hasClicked, setHasClicked] = useState(false)

  useEffect(() => {
    if (isDarkSystemNow) {
      document.documentElement.classList.add('dark')
      document.querySelector('#dark-mode-icon')?.classList.add('rotate-180')
    }
  }, [])

  const updateIsDarkMode = () => {
    isDarkMode ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
    setIsDarkMode(!isDarkMode)

    if (hasClicked) return
    setHasClicked(true)
  }

  return (
    <>
      <section className="flex justify-center p-2 w-24">
        <Button className="overflow-hidden" color="gray" onClick={updateIsDarkMode}>
          <div className="h-[16px]">
            <div
              id="dark-mode-icon"
              className={hasClicked ? (isDarkMode ? 'animate-dark-mode' : 'animate-dark-mode-continue') : ''}
            >
              <svg
                className="w-5 h-5 text-gray-500 mb-[28px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  color="#F6A92B"
                  d="M10 3V1m0 18v-2M5.05 5.05 3.636 3.636m12.728 12.728L14.95 14.95M3 10H1m18 0h-2M5.05 14.95l-1.414 1.414M16.364 3.636 14.95 5.05M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                />
              </svg>
              <svg
                className="w-5 h-5 text-gray-400 icon-moon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path
                  color="#FCE76C"
                  d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"
                />
              </svg>
            </div>
          </div>
        </Button>
      </section>
    </>
  )
}

export default DarkModeToggle
