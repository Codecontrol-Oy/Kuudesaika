import React from 'react';
import PageNotFoundContainer from './PageNotFoundContainer';

describe("<PageNotFoundContainer />", () => {

    it("Matches snapshot", () => {
        const pageNotFoundContainer = shallow(
            <PageNotFoundContainer />
        );
        expect(pageNotFoundContainer).toMatchSnapshot();
    });
}) 
