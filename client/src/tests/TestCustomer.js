import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';

import Customer from "../customer/Customer.js"

Enzyme.configure({ adapter: new Adapter() });

describe('<Customer />', () =>{
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Customer />
        );
    });

    it('should always pass',  () => {
        expect(true).toBe(true);
    });

});
