import { update_map_player } from './updateMapPlayer'
  
export function move(movement, worldMap, player) {
  let err = ''
  switch (movement) {
    case 'A':
      let update = update_map_player(worldMap,player)
      worldMap = update.worldMap
      player = update.player
      err = update.err
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
  return player
}