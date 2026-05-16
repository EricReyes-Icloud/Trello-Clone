import { BoardProvider } from './context/boardContext'
import Board from './components/board/board'
import './App.css'

function App() {
  return (
    <BoardProvider>
      <header className="app-header">
        <h1>TASKFLOW</h1>
      </header>
      <Board />
    </BoardProvider>
  )
}

export default App