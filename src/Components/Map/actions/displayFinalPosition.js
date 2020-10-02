import React, { Component }  from 'react'
  
/**
 * Affichage du fichier de sorti dans la console
 */
export function DisplayFinalPosition({ players, world }) {
  let coordonnesFinal = []

  players.forEach((player, index) => {
    coordonnesFinal.push('A' + ' - ' + player.name + ' - ' + player.x + ' - ' + player.y + ' - ' + player.orientation + ' - ' + player.tresors + '\n')
  })

  return (
    <div style={{textAlign: 'center'}}>
      <h1>
        Résultat:
      </h1>
      <h4 style={{whiteSpace: 'pre'}}>
        {coordonnesFinal}
      </h4>
    </div>
  )
}