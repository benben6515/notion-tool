import notionLogo from '../src/assets/Notion_app_logo.png'
import ProgressBar from './components/ProgressBar'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://notion.so" target="_blank">
          <img src={notionLogo} className="logo notion" alt="Notion logo" />
        </a>
      </div>
      <ProgressBar />
    </>
  )
}

export default App
