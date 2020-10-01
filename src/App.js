import React from 'react'
import { InputFolder } from './Components/Input/index'

function App() {
  return (
    <div>
      <h1>La carte aux trésors</h1>
      <h3>Veuillez selectionner un fichier .txt:</h3>
      <InputFolder />
    </div>
  )
}

export default App