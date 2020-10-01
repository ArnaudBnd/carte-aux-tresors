import React, { useEffect, useState } from 'react'
import './index.css'

export function MapInit(props) {
  const { coordonnes } = props
  const [state, setState] = useState({
    world: [],
    mapH: '',
    mapW: '',
    players: [],
    play: false,
    tresors: {
      x: '',
      y: '',
      nbr: ''
    }
  })

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

    coordonnes.map(elmt => {
      if(elmt[0].includes('C')) {
        mapH = elmt[2]
        mapW = elmt[1]

        for (var i = 0; i < elmt[2]; i++) {
          let array = []
          for (var j = 0; j < elmt[1]; j++) {
            array.push('0')
          }
          world.push(array)
        }
      } else if(elmt[0].includes('A')){
        world[elmt[3]][elmt[2]] = '0'

        players.push({
          x: parseInt(elmt[3]),
          y: parseInt(elmt[2]),
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
        world[elmt[2]][elmt[1]] = elmt[0] + '(' + elmt[3] + ')'
      } else {
        world[elmt[2]][elmt[1]] = elmt[0]
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
   * Initialisation du tableau avec les coordonnés
   */
  function initBoard() {
    const button = document.getElementById('buttonPlayGame')
    const { world, players, play } = state

    if(world.length !== 0) {
      if(button.style.display === 'none') {
        button.style.display = 'block'
      }
      const newWorld = setPlayerIntoWorld(world, players, play)

        return newWorld.map((elmt, i) => {
          return (
            <tr key={i} styles={{height: '50px'}}>{elmt.map((elmt1, j) => <td key={j} styles={{height: '50px'}}>{elmt1}</td>)}</tr>
          )
        })
      // }
    }
  }

  function setPlayerIntoWorld(world, players, play) {
    if(players.length > 0) {
      if(play) {
        const copyWorld1 = [...world]
        for(const player of players) {
          copyWorld1[player.y][player.x] = 'A'
        }
        return copyWorld1
      } else {
        const copyWorld = [...world]

        for(const player of players) {
          copyWorld[player.y][player.x] = 'A'
        }
        return copyWorld
      }
    }
  }



  // while (no_more_movement == false) {
  //   no_more_movement = true

  //   players = players.map(player => {
  //     // S'il y a un movement
  //     if(player.movements[i] !== undefined) {
  //       player = move(player.movements[i], world, player)
  //       // Tant qu'il y pas de dernier mouvement
  //       if(player.movements[i+1] !== undefined) {
  //         no_more_movement = false
  //       }
  //     }
  //     console.log('player', JSON.parse(JSON.stringify(player)))
  //   })
  //   i++
  // }

  /**
   * Jeu de(s) l'aventurier(s) en fonction des déplacements récupérés
   */
  function playMovement() {
    const { players, world, tresors } = state
    let no_more_movement = false
    let i = 0
    const newPositionPlayer = []
    const newState = {...state}

    while (no_more_movement == false) {
      no_more_movement = true

      players.forEach((player, index) => {
        // S'il y a un movement
        if(players[index].movements[i] !== undefined) {
          players[index] = move(players[index].movements[i], world, players[index], tresors)
          // Tant qu'il y pas de dernier mouvement
          if(players[index].movements[i+1] !== undefined) {
            no_more_movement = false
          } else {
            newPositionPlayer.push(players[index])
          }
        }
      })
      i++
    }
    // New coordonné
    setState({...newState, players: newPositionPlayer, play: true})
  }

  function changeNumberTresors(coordonnesTresor, tresors) {
    console.log('coordonnesTresor', coordonnesTresor)
    console.log('tresors', tresors)
    return null
  }

  function move(movement, world, player, tresors) {
    const worldMap = world

    switch (movement) {
      case 'A':
        // Avancer
        switch (player.orientation) {
          case 'N':
            // Si il sort pas de la map
            if(player.y-1 >= 0) {
              if(worldMap[player.y-1][player.x] === '0') {
                 player.y += -1
              } else if(worldMap[player.y-1][player.x].includes('T')){

                // Vérification tresor
                for(let i = 0; i < tresors.length; i++) {
                  if(tresors[i].x === player.x && tresors[i].y === player.y-1) {
                    if(tresors[i].nbr > 0) {
                      player.tresors += 1
                      tresors[i].nbr += -1
                      if(tresors[i].nbr == 0) {
                        worldMap[player.y-1][player.x] = '0'
                      }
                    }
                  } else {
                    console.log('Pas de tresors')
                  }
                }

                player.y += -1
              } else {
                console.log('erreur déplacament =>', worldMap[player.y-1][player.x])
              }
            } else {
              console.log('player sorti de la map')
            }
            break
          case 'S':
            // Si il sort pas de la map
            if(player.y+1 < worldMap.length) {
              if(worldMap[player.y+1][player.x] === '0') {
                 player.y += +1
              } else if(worldMap[player.y+1][player.x].includes('T')) {
                // Vérification tresor
                for(let i = 0; i < tresors.length; i++) {
                  if(tresors[i].x === player.x && tresors[i].y === player.y+1) {
                    console.log('tresors[i].nbr', tresors[i].nbr)
                    if(tresors[i].nbr > 0) {
                      player.tresors += 1
                      tresors[i].nbr += -1
                      if(tresors[i].nbr == 0) {
                        worldMap[player.y+1][player.x] = '0'
                      }
                    } 
                  } else {
                    console.log('Pas de tresors')
                  }
                }
                player.y += +1
              } else {
                console.log('erreur déplacament =>', worldMap[player.y-1][player.x])
              }
            } else {
              console.log('player sorti de la map')
            }
            break
          case 'O':           
            // Si il sort pas de la map
            if(player.x-1 >= 0) {
              if(worldMap[player.y][player.x-1] === '0') {
                player.x += -1
              } else if(worldMap[player.y][player.x-1].includes('T')){

                // Vérification tresor
                for(let i = 0; i < tresors.length; i++) {
                  if(tresors[i].x === player.x-1 && tresors[i].y === player.y) {
                    if(tresors[i].nbr > 0) {
                      player.tresors += 1
                      tresors[i].nbr += -1
                      if(tresors[i].nbr == 0) {
                        worldMap[player.y][player.x-1] = '0'
                      }
                    }
                  } else {
                    console.log('Pas de tresors')
                  }
                }

                player.x += -1
              } else {
                console.log('erreur déplacament =>', worldMap[player.y][player.x-1])
              }
            } else {
              console.log('player sorti de la map')
            }
            break
          case 'E':
            // Si il sort pas de la map
            if(player.x+1 < worldMap[player.y].length) {
              if(worldMap[player.y][player.x+1] === '0') {
                 player.x += 1
              } else if(worldMap[player.y][player.x+1].includes('T')){
                // Vérification tresor
                for(let i = 0; i < tresors.length; i++) {
                  if(tresors[i].x === player.x+1 && tresors[i].y === player.y) {
                    if(tresors[i].nbr > 0) {
                      player.tresors += 1
                      tresors[i].nbr += -1
                      if(tresors[i].nbr == 0) {
                        worldMap[player.y][player.x+1] = '0'
                      }
                    }
                  } else {
                    console.log('Pas de tresors')
                  }
                }

                player.x += 1
              } else {
                console.log('erreur déplacament =>', worldMap[player.y][player.x+1])
              }
            } else {
              console.log('player sorti de la map')
            }
            break
        }
        break
      case 'G':
        switch (player.orientation) {
          case 'N':
            player.orientation = 'O'
            break
          case 'S':
            player.orientation = 'E'
            break
          case 'O':
            player.orientation = 'S'
            break
          case 'E':
            player.orientation = 'N'
            break
        }
        break
      case 'D':
        switch (player.orientation) {
          case 'N':
            player.orientation = 'E'
            break
          case 'S':
            player.orientation = 'O'
            break
          case 'O':
            player.orientation = 'N'
            break
          case 'E':
            player.orientation = 'S'
            break
        }
        break
    }
    console.log('player final ', player)
    console.log('tresors final', tresors)
    return player
  }

  return (
    <div>
      <table>
        <tbody>
          {initBoard()}
        </tbody>
      </table>
      <br />
      <button 
        id="buttonPlayGame"
        style={{ display: 'none', margin: '0 auto' }}
        onClick={() => playMovement()}>
        PLAY
      </button>
    </div>
  )
}