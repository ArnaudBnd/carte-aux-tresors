import React from 'react'
import { update_map_player } from '../Components/Map/actions/updateMapPlayer'
import { move } from '../Components/Map/actions/movePlayer'
import Enzyme from 'enzyme'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe("Movement ", () => {
  let worldMap = []
  let expected_worldMap = []

  beforeEach(() => {
    worldMap = []
    expected_worldMap = []

    for (var i=0; i<3; i++) {
      worldMap.push([])
      expected_worldMap.push([])

      for (var j=0; j<3; j++) {
        worldMap[i].push({type:"0", tresor:0})
        expected_worldMap[i].push({type:"0", tresor:0})
      }
    }
  })

  it('should increment tresor and player tresor ', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "N",
                  tresors: 0,
                  x: 1,
                  y: 1}

    let expected_player = {movements: ["A"],
                  name: "test",
                  orientation: "N",
                  tresors: 1,
                  x: 1,
                  y: 0}

    worldMap[0][1] = {type:"0", tresor:2}
    worldMap[1][1] = {type:"A", tresor:0}
    expected_worldMap[0][1]={type:"A", tresor:1}

    var test=update_map_player(worldMap,player)
    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': expected_player, 'err': ""})
  })

  it('shouldnt go out of map down', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "S",
                  tresors: 0,
                  x: 1,
                  y: 2}            

    worldMap[2][1] = {type:"A", tresor:0}
    expected_worldMap[2][1] = {type:"A", tresor:0}

    var test = update_map_player(worldMap,player)

    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': player, 'err': "player sorti de la map"})
  })

  it('shouldnt go out of map down', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "S",
                  tresors: 0,
                  x: 1,
                  y: 2}            

    worldMap[2][1] = {type:"A", tresor:0}
    expected_worldMap[2][1] = {type:"A", tresor:0}

    var test = update_map_player(worldMap,player)

    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': player, 'err': "player sorti de la map"})

  })

  it('shouldnt go out of map up', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "N",
                  tresors: 0,
                  x: 2,
                  y: 0}            

    worldMap[0][2] = {type:"A", tresor:0}
    expected_worldMap[0][2] = {type:"A", tresor:0}

    var test = update_map_player(worldMap,player)

    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': player, 'err': "player sorti de la map"})
  })

   it('shouldnt go out of map left', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "N",
                  tresors: 0,
                  x: 1,
                  y: 0}            

    worldMap[0][1] = {type:"A", tresor:0}
    expected_worldMap[0][1] = {type:"A", tresor:0}

    var test = update_map_player(worldMap,player)

    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': player, 'err': "player sorti de la map"})
  })

   it('shouldnt go out of map right', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "N",
                  tresors: 0,
                  x: 2,
                  y: 0}            

    worldMap[0][2] = {type:"A", tresor:0}
    expected_worldMap[0][2] = {type:"A", tresor:0}

    var test = update_map_player(worldMap,player)

    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': player, 'err': "player sorti de la map"})
  })

  it('should block because of player', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "E",
                  tresors: 0,
                  x: 1,
                  y: 1}
    worldMap[1][1] = {type:"A", tresor:0}
    worldMap[1][2] = {type:"A", tresor:0}
    expected_worldMap[1][1] = {type:"A", tresor:0}
    expected_worldMap[1][2] = {type:"A", tresor:0}
    var test = update_map_player(worldMap,player)

    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': player, 'err': "player met another player"})

  })

  it('should block because of mountain', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "O",
                  tresors: 0,
                  x: 1,
                  y: 1}
    worldMap[1][0] = {type:"M", tresor:0}
    worldMap[1][1] = {type:"A", tresor:0}
    expected_worldMap[1][0] = {type:"M", tresor:0}
    expected_worldMap[1][1] = {type:"A", tresor:0}
    var test = update_map_player(worldMap,player)
    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': player, 'err': "player met a mountain"})
  })

 it('should advance to left and change position of player', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "O",
                  tresors: 0,
                  x: 1,
                  y: 1}

    let expected_player = {movements: ["A"],
                  name: "test",
                  orientation: "O",
                  tresors: 0,
                  x: 0,
                  y: 1}

    worldMap[1][1] = {type:"A", tresor:0}
    expected_worldMap[1][0]={type:"A", tresor:0}
    var test=update_map_player(worldMap,player)
    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': expected_player, 'err': ""})
  })

  it('should advance to right and change position of player', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "E",
                  tresors: 0,
                  x: 1,
                  y: 1}

    let expected_player = {movements: ["A"],
                  name: "test",
                  orientation: "E",
                  tresors: 0,
                  x: 2,
                  y: 1}

    worldMap[1][1] = {type:"A", tresor:0}
    expected_worldMap[1][2]={type:"A", tresor:0}
    var test=update_map_player(worldMap,player)
    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': expected_player, 'err': ""})
  })

  it('should advance to up and change position of player', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "N",
                  tresors: 0,
                  x: 1,
                  y: 1}

    let expected_player = {movements: ["A"],
                  name: "test",
                  orientation: "N",
                  tresors: 0,
                  x: 1,
                  y: 0}

    worldMap[1][1] = {type:"A", tresor:0}
    expected_worldMap[0][1]={type:"A", tresor:0}
    var test=update_map_player(worldMap,player)
    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': expected_player, 'err': ""})
  })

  it('should advance to down and change position of player', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "S",
                  tresors: 0,
                  x: 1,
                  y: 1}

    let expected_player = {movements: ["A"],
                  name: "test",
                  orientation: "S",
                  tresors: 0,
                  x: 1,
                  y: 2}

    worldMap[1][1] = {type:"A", tresor:0}
    expected_worldMap[2][1]={type:"A", tresor:0}
    var test=update_map_player(worldMap,player)
    expect(test).toStrictEqual({'worldMap' : expected_worldMap, 'player': expected_player, 'err': ""})
  })

  it('should be oriented E', () => {
    let player = {
      movements: ["D"],
      name: "test",
      orientation: "N",
      tresors: 0,
      x: 1,
      y: 1
    }

    worldMap[1][1] = {type:"A", tresor:0}
    let expected_player = { 
      movements: ["D"],
      name: "test",
      orientation: "E",
      tresors: 0,
      x: 1,
      y: 1}
    let player_outcome = move(player.movements[0], worldMap, player)
    expect(player_outcome).toStrictEqual(expected_player)
  })

  it('should be oriented E', () => {
    let player = {
      movements: ["D"],
      name: "test",
      orientation: "S",
      tresors: 0,
      x: 1,
      y: 1
    }

    worldMap[1][1] = {type:"A", tresor:0}
    let expected_player = { 
      movements: ["D"],
      name: "test",
      orientation: "O",
      tresors: 0,
      x: 1,
      y: 1}
    let player_outcome = move(player.movements[0], worldMap, player)
    expect(player_outcome).toStrictEqual(expected_player)
  })

  it('should be oriented N', () => {
    let player = {
      movements: ["D"],
      name: "test",
      orientation: "O",
      tresors: 0,
      x: 1,
      y: 1
    }

    worldMap[1][1] = {type:"A", tresor:0}
    let expected_player = { 
      movements: ["D"],
      name: "test",
      orientation: "N",
      tresors: 0,
      x: 1,
      y: 1}
    let player_outcome = move(player.movements[0], worldMap, player)
    expect(player_outcome).toStrictEqual(expected_player)
  })

  it('should be oriented S', () => {
    let player = {
      movements: ["D"],
      name: "test",
      orientation: "E",
      tresors: 0,
      x: 1,
      y: 1
    }

    worldMap[1][1] = {type:"A", tresor:0}
    let expected_player = { 
      movements: ["D"],
      name: "test",
      orientation: "S",
      tresors: 0,
      x: 1,
      y: 1}
    let player_outcome = move(player.movements[0], worldMap, player)
    expect(player_outcome).toStrictEqual(expected_player)
  })
})