import React from 'react'
import { MapInit } from '../Components/Map/index'
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

  beforeEach(() => {
    wrapper = shallow(<MapInit />)
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('has the initial state count of zero', () => {
    wrapper.find('button').props().onClick()
    expect(setState).not.toBe({
      world: [],
      mapH: '',
      mapW: '',
      players: [],
      play: false,
    })
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