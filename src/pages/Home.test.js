import Home from "./Home";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

Enzyme.configure({adapter: new Adapter()});
describe('Home', function () {
  it('should have random words paragraph', function () {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('.randomWords')).toHaveLength(1);
  });
});