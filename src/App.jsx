import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import PracticePage from './pages/PracticePage'
import { courseData } from './data/courseData'

function AppShell() {
  const { id, screenId } = useParams()
  const location = useLocation()
  const practiceNumber = Number(id)
  const screenNumber = screenId === undefined ? undefined : Number(screenId)
  const practice = courseData.find((item) => item.number === practiceNumber)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  if (!practice) {
    return <Navigate to="/practice/1" replace />
  }

  if (screenId !== undefined) {
    const screensCount = practice.categories.reduce((sum, category) => sum + category.screens.length, 0)
    const isValidScreen = Number.isInteger(screenNumber) && screenNumber >= 1 && screenNumber <= screensCount

    if (!isValidScreen) {
      return <Navigate to={`/practice/${practiceNumber}`} replace />
    }
  }

  return (
    <Layout practices={courseData} currentPracticeId={practice.id}>
      {({ setContext, setContextNotes }) => (
        <PracticePage
          practiceNumber={practiceNumber}
          screenNumber={screenNumber}
          setContext={setContext}
          setContextNotes={setContextNotes}
        />
      )}
    </Layout>
  )
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/practice/1" replace />} />
        <Route path="/practice/:id" element={<AppShell />} />
        <Route path="/practice/:id/screen/:screenId" element={<AppShell />} />
        <Route path="*" element={<Navigate to="/practice/1" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
