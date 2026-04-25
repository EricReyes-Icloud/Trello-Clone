import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Board from './components/board'
import './App.css'

const initialData = [
  {
    id: "list_1",
    title: "Por hacer",
    cards: [
      { id: "card-1", text: "Aprender React" },
      { id: "card-2", text: "Construir Proyecto" }
    ]
  },
  {
    id: "list_2",
    title: "En progreso",
    cards: [
      { id: "card-3", text: "Hacer Trello Clone" }
    ]
  }
] 


function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Trello Clone</h1>
      <Board lists={initialData} />
    </div>
  )
}

export default App;
