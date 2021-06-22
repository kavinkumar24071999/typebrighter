import Enzyme, {mount, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from './App'

Enzyme.configure({adapter: new Adapter()});

describe('App', function () {
  it('should have home page', function () {
    const wrapper = shallow(<App/>);
    
  });
});