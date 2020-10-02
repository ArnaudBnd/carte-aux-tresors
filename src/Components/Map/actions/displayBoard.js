import React, { Component }  from 'react'

/**
 * Affichage de la map
 */
export function DisplayBoard({ players, world }) {
  const button = document.getElementById('buttonPlayGame')

  if(world.length !== 0) {
    if(button.style.display === 'none') {
      button.style.display = 'block'
    }

    if(players.length > 0) {
      return world.map((elmt, i) => {
        return (
          <tr key={i}
              styles={{height: '50px'}}>
              {elmt.map((elmt1, j) => 
                <td key={j}
                  styles={{height: '50px'}}>
                  {elmt1.tresor!=0?'T('+elmt1.tresor+')':elmt1.type}
                </td>
              )}
          </tr>
        )
      })
    }
  }
}