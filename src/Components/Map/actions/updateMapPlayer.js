export function update_map_player(worldMap, player){
  let coordonnee={x:0,y:0}
  console.log('player', JSON.parse(JSON.stringify(player)))
  switch (player.orientation) {
    case 'N':
      coordonnee={y:-1, x:0}
      break
    case 'E':
      coordonnee={y:0, x:1}
      break
    case 'S':
      coordonnee={y:1, x:0}
      break
    case 'O':
      coordonnee={y:0, x:-1}
      break
  }
  if (player.y+coordonnee.y < 0 || player.x+coordonnee.x < 0 ||
      player.y+coordonnee.y >= worldMap.length || player.x + coordonnee.x >= worldMap[player.y].length) {
    console.log('player sorti de la map')
  } else if (worldMap[player.y+coordonnee.y][player.x+coordonnee.x].type === "A" ) {
    console.log('player met another player')
  } else if (worldMap[player.y+coordonnee.y][player.x+coordonnee.x].type === "0" ) {
    if(worldMap[player.y+coordonnee.y][player.x+coordonnee.x].tresor !== 0){
      player.tresors += 1
      worldMap[player.y+coordonnee.y][player.x+coordonnee.x].tresor += -1
    }
    worldMap[player.y][player.x].type = "0"
    player.y += coordonnee.y
    player.x += coordonnee.x
    worldMap[player.y][player.x].type = "A"
  } else {
    console.log('player met a mountain')
  }
  return {"worldMap":worldMap, "player":player}
}