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

  it('contains a button Upload a file', () => {
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

  it('simulates onChange who select file', () => {
    const fileContents = 'file contents'
    const file = new Blob([fileContents], {type : 'text/plain'})

    wrapper.find('input').simulate('onChange', {target: {files: [file]}})
  })

  it('simulate select file', () => {
    const event = {
        target: {
            files: [{ 
              lastModified: 1601630992047,
              name: "test_mis_en_page.txt",
              size: 163,
              type: "text/plain"
          }]
        }
    }

    jest.spyOn(global, 'FileReader').mockImplementation(function () {
      this.readAsText = jest.fn()
    })

    wrapper.find('input[type="file"]').simulate('change', event) 
    let reader = FileReader.mock.instances[0]
    expect(reader.onload).toStrictEqual(expect.any(Function))
  })
})