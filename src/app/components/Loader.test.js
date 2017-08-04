import React from 'react';
import Loader from './Loader';

describe('<Loader />', () => {
    it('should match snapshot', () => {
        const loader = shallow(<Loader />);
        expect(loader).toMatchSnapshot();
    });
    it('should contain correct elements', () => {
        const loader = shallow(<Loader />);
        expect(loader.find('span').length).toEqual(1);
        expect(loader.find('Spinning').length).toEqual(1);
    });
});

