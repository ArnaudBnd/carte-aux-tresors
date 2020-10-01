import React, { useState } from 'react'
import { MapInit } from '../Map/index.js' 

export function InputFolder() {
  const hiddenFileInput = React.useRef(null)
  const [mapCoordonnes, setMapCoordonnes] = useState([])
  
  const handleClick = event => {
    hiddenFileInput.current.click()
  }

  const handleChange = event => {
    let fileData = new FileReader()
    const myFile = event.target.files[0]

    fileData.onload = (fileLoadedEvent) => {
      const textFromFileLoaded = fileLoadedEvent.target.result
      const textSplit = textFromFileLoaded.split(/\n/)
      const suppressComment = []

      textSplit.map(elmt => {
        if(elmt.search('#') === 0) {
          return
        } else {
          suppressComment.push(elmt.toUpperCase().split(' - '))
        }
      })

      setMapCoordonnes(suppressComment)
    }

    fileData.readAsText(myFile, "UTF-8")
  }

  return (
    <div>
      <button onClick={handleClick}>
        Upload a file
      </button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display: 'none'}}
      /> 
      <MapInit coordonnes={mapCoordonnes} />
    </div>
  )
}