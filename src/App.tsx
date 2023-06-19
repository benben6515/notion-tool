import notionLogo from '../src/assets/Notion_app_logo.png'
import ProgressBar from './components/ProgressBar'
import I18nToggle from './components/I18nToggle'
import { ToastSuccess, ToastDanger } from './components/Toast'

function App() {
  return (
    <>
      <main>
        <section className="fixed top-20 w-full flex justify-center">
          {ToastSuccess('notify.alert.copySuccess')}
          {ToastDanger('notify.alert.copyError')}
        </section>

        <nav className="flex justify-end items-center w-screen">
          <div className="fixed right-2 top-20">
            <I18nToggle />
          </div>
        </nav>

        <section className="flex flex-col justify-center items-center pb-8 w-3/4 max-w-3xl mx-auto">
          <div className="w-40 h-40 pa-8 flex justify-center">
            <a href="https://notion.so" target="_blank">
              <img src={notionLogo} className="logo notion" alt="Notion logo" />
            </a>
          </div>
          <ProgressBar />
        </section>
      </main>
    </>
  )
}

export default App
