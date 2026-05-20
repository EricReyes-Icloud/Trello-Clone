import { BoardProvider } from './context/boardContext'
import { ToastProvider } from './context/ToastContext'
import { useToast } from './context/ToastContext'
import { ToastContainer } from './components/ui/Toast'
import Board from './components/board/board'
import './App.css'

function AppContent() {
  const { toasts, removeToast, triggerUndo } = useToast()

  return (
    <>
      <header className="app-header">
        <h1>TASKFLOW</h1>
      </header>
      <Board />
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
        onUndo={triggerUndo}
      />
    </>
  )
}

function App() {
  return (
    <ToastProvider>
      <BoardProvider>
        <AppContent />
      </BoardProvider>
    </ToastProvider>
  )
}

export default App