import React, { useEffect, useState } from 'react'
import { move } from './actions/movePlayer'
import { DisplayBoard } from './actions/displayBoard'
import { DisplayFinalPosition } from './actions/displayFinalPosition'
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
    if(coordonnes.length > 0) {
      initDataBoard(coordonnes)
    }
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
          {world.length && players.length > 0 ? <DisplayBoard world={world} players={players} /> : null} 
        </tbody>
      </table>
      <br />
      { play ? 
          <DisplayFinalPosition world={world} players={players} /> : 
          <button 
            id="buttonPlayGame"
            style={{ display: 'none', margin: '0 auto' }}
            onClick={() => playMovement()}>
            PLAY
      </button>}
    </div>
  )
}