import React, { useEffect, useState } from 'react'
import { move } from './actions/movePlayer' 
import './index.css'

export function MapInit(props) {
  const { coordonnes } = props
  const [state, setState] = useState({
    world: [],
    mapH: '',
    mapW: '',
    players: [],
    play: false,
  })
  const { play, players, world } = state

  useEffect(() => {
    initDataBoard(coordonnes)
  }, [coordonnes])

  /**
   * Initialisation des coordonnés du tableau 
   * @param coordonnes
   */
  function initDataBoard(coordonnes) {
    const world = []
    let mapH = ''
    let mapW = ''
    let players = []
    let tresors = []

    coordonnes.map(element => {
      const elmt = element[0].split('-')
      if(elmt[0].includes('C')) {
        mapH = elmt[2]
        mapW = elmt[1]

        for (var i = 0; i < elmt[2]; i++) {
          let array = []
          for (var j = 0; j < elmt[1]; j++) {
            array.push({type : '0', tresor : 0})
          }
          world.push(array)
        }
      } else if(elmt[0].includes('A')){
        world[elmt[3]][elmt[2]] = {type : 'A', tresor : 0}

        players.push({
          x: parseInt(elmt[2]),
          y: parseInt(elmt[3]),
          tresors: 0,
          orientation: elmt[4],
          movements: elmt[5].split(''),
          name: elmt[1]
        })
      } else if(elmt[0].includes('T')){
        tresors.push({
          x: parseInt(elmt[1]),
          y: parseInt(elmt[2]),
          nbr: parseInt(elmt[3])
        })
        world[elmt[2]][elmt[1]] = {type : '0', tresor : parseInt(elmt[3])}
      } else {
        world[elmt[2]][elmt[1]] = {type : elmt[0], tresor : 0}
      }
    })

    setState({...state,
      world,
      mapH,
      mapW,
      players,
      tresors
    })
  }

  /**
   * Affichage de la map
   */
  function initBoard() {
    const button = document.getElementById('buttonPlayGame')
    const { world, players } = state

    if(world.length !== 0) {
      if(button.style.display === 'none') {
        button.style.display = 'block'
      }

      return displayWorld(world, players)
    }
  }

  /**
   * Rendu de la carte
   * @param world, players, play
   */
  function displayWorld(world, players) {
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

  /**
   * Affichage du fichier de sorti dans la console
   */
  function finalCoordonnesToDisplay(players, world) {
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

  /**
   * Jeu de(s) l'aventurier(s) en fonction des déplacements récupérés
   */
  function playMovement() {
    const { players, world, tresors } = state
    let no_more_movement = false
    let i = 0

    while (no_more_movement == false) {
      no_more_movement = true

      players.forEach((player, index) => {
        if(players[index].movements[i] !== undefined) {
          players[index] = move(players[index].movements[i], world, players[index], tresors)
          if(players[index].movements[i+1] !== undefined) {
            no_more_movement = false
          }
        }
      })
      i++
    }
    setState({...state, play: true})
  }

  return (
    <div>
      <table>
        <tbody>
          {initBoard()}
        </tbody>
      </table>
      <br />
      { play ? 
          finalCoordonnesToDisplay(players, world) : 
          <button 
            id="buttonPlayGame"
            style={{ display: 'none', margin: '0 auto' }}
            onClick={() => playMovement()}>
            PLAY
      </button>}
    </div>
  )
}