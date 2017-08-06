import React from 'react';
import ActionResolution from './ActionResolution';

describe('<ActionResolution />', () => {

    it('Should match snapshot', () => {
        const actionResolution = shallow(
            <ActionResolution resolution={""} />
        );
        expect(actionResolution).toMatchSnapshot();
    });

    it('Should should render passed', () => {
        const actionResolution = mount(
            <ActionResolution resolution={"PASSED"} />
        );
        expect(actionResolution.find('h4').length).toEqual(1);
        expect(actionResolution.find('h4').first().text()).toEqual(' Hyväksytty ehdotuksen mukaan')

    });

    it('Should should render tabled', () => {
        const actionResolution = mount(
            <ActionResolution resolution={"TABLED"} />
        );
        expect(actionResolution.find('h4').length).toEqual(1);
        expect(actionResolution.find('h4').text()).toEqual(' Pöydätty')
    });
});