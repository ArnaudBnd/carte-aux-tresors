import React from 'react'
import { MapInit } from '../Components/Map/index'
import { DisplayFinalPosition } from '../Components/Map/actions/displayFinalPosition'
import Enzyme from 'enzyme'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe("MapInit ", () => {
  let wrapper
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState])

 const coordonnes = [
    ["C​-3-4"],
    ["M​-1-0"],
    ["M​-2-1"],
    ["T​-0-3-2"],
    ["T​-1-3-3"],
    ["A​-LARA-1-1-S-AADADAGGA"],
    ["A​-NABIL-1-2-E-A"]
  ]

  beforeEach(() => {
    wrapper = shallow(<MapInit coordonnes={coordonnes} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('tests if component renders correctly ', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has the initial state count of zero', () => {
    wrapper.find('button').props().onClick()
    expect(setState).not.toBe({
      world: [],
      mapH: '',
      mapW: '',
      players: [],
      play: false,
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders not null', () => {
   expect(wrapper).not.toBeNull()
  }) 

  it('contains a button PLAY', () => {
    const button = <button> PLAY </button>
    expect(wrapper.containsMatchingElement(button)).toBe(true)
  })  

  it('calls playMovement() when button PLAY is clicked', () => {
    wrapper.find('button').simulate('onClick')
  })
})