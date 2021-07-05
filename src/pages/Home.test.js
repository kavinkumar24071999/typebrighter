import Home from "./Home";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

Enzyme.configure({adapter: new Adapter()});
jest.useFakeTimers();
describe('Home', function () {
  it('should have words-bar if the word status is visible', function () {
    const wrapper = shallow(<Home/>);
    wrapper.setState({isWordVisible: true});
    expect(wrapper.find('.words-bar')).toHaveLength(1);
  });

  it('should have twenty words in the word-bar', function () {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('span')).toHaveLength(20);
  });

  it('should have start button', function () {
    const wrapper = mount(<Home/>);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should start test on clicking the button', function () {
    const wrapper = mount(<Home/>);
    const buttonComponent = wrapper.find('button')
    buttonComponent.simulate('click');
    expect(setInterval).toBeCalled();
    expect(wrapper.find('.words-bar')).toHaveLength(1)
  });

  it('should have input bar for receiving inputs', function () {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should call handle word change method when there is a change in input', function () {
    const mockFunction = jest.fn();
    Home.prototype.handleWordChange = mockFunction
    const wrapper = shallow(<Home/>);
    const event = {target: {value: 'some value'}}
    wrapper.find('input').simulate('change', event);
    expect(mockFunction).toBeCalled();
  });

  describe('shuffle', function () {
    it('should shuffle given array', function () {
      const words = ['one', 'two', 'three']
      const shuffledWords = new Home().shuffle(words)
      const isTheWordArraysEqual = words.every((word) => shuffledWords.includes(word))
      expect(isTheWordArraysEqual).toBe(true)
    });
  });

  describe('complete correct', function () {
    it('should return true when the word is complete and correct', function () {
      const wrapper = shallow(<Home/>)
      const actualValue = new Home().completeCorrect(wrapper.state().words[0]);
      expect(actualValue).toBe(true)
    });

    it('should return false when word is incomplete and correct', function () {
      const actualValue = new Home().completeCorrect('another word');
      expect(actualValue).toBe(false)
    });

    it('should return false when word is complete and incorrect', function () {
      const actualValue = new Home().completeCorrect('haae ');
      expect(actualValue).toBe(false)
    });
  });

  describe('incorrect', function () {
    it('should return true if the word is incorrect', function () {
      const actualValue = new Home().isIncorrect('haae');
      expect(actualValue).toBe(true)
    });

    it('should return false if the word is correct', function () {
      const wrapper = shallow(<Home/>)
      const actualValue = new Home().isIncorrect(wrapper.state().words[0]);
      expect(actualValue).toBe(false)
    });
  });

  describe('correct Incomplete', function () {
    it('should return true if the word is correct and incomplete', function () {
      const wrapper = shallow(<Home/>)
      const actualValue = new Home().correctIncomplete(wrapper.state().words[0].split(0, 2));
      expect(actualValue).toBe(true)
    });

    it('should return false if the word is wrong and incomplete', function () {
      const actualValue = new Home().correctIncomplete('hov');
      expect(actualValue).toBe(false)
    });

    it('should return false if the word is correct but complete', function () {
      const wrapper = shallow(<Home/>)
      const actualValue = new Home().correctIncomplete(wrapper.state().words[0]);
      expect(actualValue).toBe(false);
    });
  });

  describe('is selected', function () {
    it('should return true when the index is same as word count', function () {
      const actualValue = new Home().isSelected(0);
      expect(actualValue).toBe(true);
    });

    it('should return false when the index is not same as the word count', function () {
      const actualValue = new Home().isSelected(1);
      expect(actualValue).toBe(false);
    });
  });

  describe('display result', function () {
    it('should display result when word is invisible', function () {
      const wrapper = shallow(<Home/>);
      wrapper.setState({isWordVisible: false})
      wrapper.instance().displayResult()
      expect(wrapper.find('.result')).toHaveLength(1)
    });
  });

  // TODO : do not test states refer https://medium.com/@newyork.anthonyng/testing-react-components-state-b57bfc712b90

  describe('getRandomWords', function () {
    it('should have span class name correct if the word is complete and correct', async function () {
      const wrapper = mount(<Home/>);
      new Home().handleWordChange(wrapper.state().words[0] + ' ')
      // const event = {target: {value: 'have '}}
      // wrapper.find('input').simulate('change', event);
      // const spanTag = wrapper.find('span');
      // expected class name should be correct and not highlight
      // expect(spanTag.at(1).hasClass('highlight')).toBeTruthy()
    });

    it('should have span class name incorrect if the word is incorrect', function () {
      const wrapper = mount(<Home/>);
      const event = {target: {value: 'leave '}}
      wrapper.find('input').simulate('change', event);
      const spanTag = wrapper.find('span');
      // expected class name should be correct and not highlight
      // expect(spanTag.at(1).hasClass('highlight')).toBeTruthy()
    });
  });
});