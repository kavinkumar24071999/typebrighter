import Enzyme, {shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Timer from "./Timer";

Enzyme.configure({adapter: new Adapter()});
jest.useFakeTimers();

describe('Timer', function () {
  it('should contain start button', function () {
    const wrapper = shallow(<Timer/>)
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should display the time', function () {
    const wrapper = shallow(<Timer seconds={'60'}/>)
    expect(wrapper.find('.timer')).toHaveLength(1)
  });

  describe('start timer', function () {
    it('should call set interval', function () {
      const wrapper = shallow(<Timer seconds={60}/>)
      wrapper.instance().startTimer()
      expect(setInterval).toBeCalledTimes(1);
      expect(setInterval).toBeCalledWith(wrapper.instance().changeTime, 1000)
    });
  });

  describe('Start button', function () {
    it('should call props on click and start timer when clicking the button', function () {
      const onClickMock = jest.fn()
      const startTimerMock = jest.fn()
      Timer.prototype.startTimer = startTimerMock
      const wrapper = shallow(<Timer onClick={onClickMock}/>)
      const button = wrapper.find('button');
      button.simulate('click');
      expect(onClickMock).toBeCalledTimes(1)
      expect(startTimerMock).toBeCalledTimes(1)
      jest.clearAllMocks()
    });
  });

  describe('is timer running', function () {
    it('should return true if time is greater than 0', function () {
      const wrapper = shallow(<Timer seconds={60}/>)
      const actualValue = wrapper.instance().isTimerRunning()
      expect(actualValue).toBe(true)
    });
  });

  describe('end timer', function () {
    it('should call props on end and clear interval and set seconds to initial value', function () {
      const onEndMock = jest.fn()
      const wrapper = shallow(<Timer seconds={60} onEnd={onEndMock}/>)
      wrapper.instance().endTimer();
      expect(onEndMock).toBeCalledTimes(1);
      expect(clearInterval).toBeCalledTimes(1)
      expect(wrapper.state().time).toBe(60)
    });
  });

  describe('change time', function () {
    it('should decrement time if timer is running', function () {
      const wrapper = shallow(<Timer seconds={60}/>)
      wrapper.instance().changeTime()
      expect(wrapper.state().time).toBe(59)
    });
    it('should call end timer if timer is not running', function () {
      Timer.prototype.endTimer = jest.fn()
      const wrapper = shallow(<Timer seconds={0}/>)
      wrapper.instance().changeTime()
      expect(wrapper.instance().endTimer).toBeCalledTimes(1)
    });
  });
});