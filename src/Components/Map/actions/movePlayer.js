  /**
   * Déplacement de(s) player(s)
   * @param movement, worldMap, player, tresors
   */
  export function move(movement, worldMap, player, tresors) {
    switch (movement) {
      case 'A':
        switch (player.orientation) {
          case 'N':
            if(player.y-1 >= 0) {
              if(worldMap[player.y-1][player.x].tresor !== 0){
                player.tresors += 1
                worldMap[player.y-1][player.x].tresor += -1
                worldMap[player.y][player.x].type = "0"
                player.y += -1
                worldMap[player.y][player.x].type = "A"
              } else if(worldMap[player.y-1][player.x].type === '0') {
                worldMap[player.y][player.x].type = "0"
                player.y += -1
                worldMap[player.y][player.x].type = "A"
              } else {
                console.log('erreur déplacament =>' )
              }
            } else {
              console.log('player sorti de la map')
            }
            break
          case 'S':
            if(player.y+1 < worldMap.length) {
              if(worldMap[player.y+1][player.x].tresor !== 0) {
                player.tresors += 1
                worldMap[player.y+1][player.x].tresor += -1
                worldMap[player.y][player.x].type = "0"
                player.y += +1
                worldMap[player.y][player.x].type = "A"
              } else if(worldMap[player.y+1][player.x].type === '0') {
                worldMap[player.y][player.x].type = "0"
                player.y += +1
                worldMap[player.y][player.x].type = "A"
              } else {
                console.log('Joueur a rencontré un obstacle')
              }
            } else {
              console.log('player sorti de la map')
            }
            break
          case 'O':           
            if(player.x-1 >= 0) {
              if(worldMap[player.y][player.x-1].tresor !== 0){
                player.tresors += 1
                worldMap[player.y][player.x-1].tresor += -1
                worldMap[player.y][player.x].type = "0"
                player.x += -1
                worldMap[player.y][player.x].type = "A"
              } else if(worldMap[player.y][player.x-1].type === '0') {
                worldMap[player.y][player.x].type = "0"
                player.x += -1
                worldMap[player.y][player.x].type = "A"
              } else {
                console.log('Joueur a rencontré un obstacle')
              }
            } else {
              console.log('player sorti de la map')
            }
            break
          case 'E':
            if(player.x+1 < worldMap[player.y].length) {
              if(worldMap[player.y][player.x+1].tresor !== 0){
                player.tresors += 1
                worldMap[player.y][player.x+1].tresor += -1
                worldMap[player.y][player.x].type = "0"
                player.x += 1
                worldMap[player.y][player.x].type = "A"
              } else if(worldMap[player.y][player.x+1].type === '0') {
                worldMap[player.y][player.x].type = "0"
                player.x += 1
                worldMap[player.y][player.x].type = "A"
              } else {
                console.log('Joueur a rencontré un obstacle')
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

    return player
  }