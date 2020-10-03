import React from 'react'
import { InputFolder } from '../Components/Input/index'
import Enzyme from 'enzyme'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe("InputFolder", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<InputFolder />)
  })

  it('renders', () => {
   expect(wrapper).not.toBeNull()
  }) 

  it('renders App component', () => {
   expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('contains a button', () => {
    const button = <button> Upload a file </button>
    expect(wrapper.containsMatchingElement(button)).toBe(true)
  })

  it('calls handleClick when upload file is clicked', () => {
    wrapper.find('button').simulate('onClick')
  })

  it('contains a input', () => {
    const input = <input></input>
    expect(wrapper.containsMatchingElement(input)).toBe(true)
  })

  it('contains a props type name file', () => {
    const input = wrapper.find('input')
    expect(input.props().type).toBe('file')
  })

  it('calls handleChange when upload file is selected', () => {
    wrapper.find('input').simulate('onChange')
  })
})