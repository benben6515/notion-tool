import notionLogo from '../src/assets/Notion_app_logo.png'
import ProgressBar from './components/ProgressBar'
import I18nToggle from './components/I18nToggle'

function App() {
  return (
    <>
      <main className="flex flex-col justify-start items-center">
        <div className="w-40 h-40 pa-8 flex justify-center">
          <a href="https://notion.so" target="_blank">
            <img src={notionLogo} className="logo notion" alt="Notion logo" />
          </a>
        </div>
        <I18nToggle />
        <ProgressBar />
      </main>
    </>
  )
}

export default App
