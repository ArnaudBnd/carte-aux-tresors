import React from 'react'
import { move } from '../Components/Map/actions/movePlayer'
import Enzyme from 'enzyme'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe("Movement ", () => {
  // let wrapper
  let worldMap = []
  let expected_worldMap = []
  // const setState = jest.fn()
  // const useStateSpy = jest.spyOn(React, 'useState')
  // useStateSpy.mockImplementation((init) => [init, setState])

  beforeEach(() => {
    for (var i=0; i<3; i++) {
      worldMap.push([])
      for (var j=0; j<3; j++) {
        worldMap[i].push([{type:0, tresor:0}])
      }
    }
    expected_worldMap = worldMap
  })

  it('should block player', () => {
    let player = {movements: ["A"],
                  name: "test",
                  orientation: "E",
                  tresors: 0,
                  x: 1,
                  y: 1};
    expected_worldMap[1][2]={type:"A", tresor:0}
    var test=move(worldMap,player)
    expect(test.worldMap).toBe(expected_worldMap)
  })
})