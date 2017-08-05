import React from 'react';
import LatestCase from './LatestCase';
import Label from 'grommet/components/Label';

describe("<LatestCase />", () => {
    it("Matches snapshot", () => {
    const latestCase = shallow(
        <LatestCase url={"http://testurl.com"}
                    id={2}
                    data_source={"testSource"}
                    actions={null}
                    geometries={null}
                    created_at={"2017-01-1T10:00:00.00000Z"}
                    modified_at={"2017-01-1T10:00:00.00000Z"}
                    origin_id={"1"}
                    title={"Test case"}
                    register_id={"CASE 12345-1"}
                    function={null}
                    attachments={null} />
    );

    expect(latestCase).toMatchSnapshot();
    });

    it('should contain correct elements', () => {
        const latestCase = shallow(<LatestCase url={"http://testurl.com"}
                    id={2}
                    data_source={"testSource"}
                    actions={null}
                    geometries={null}
                    created_at={"2017-01-1T10:00:00.00000Z"}
                    modified_at={"2017-01-1T10:00:00.00000Z"}
                    origin_id={"1"}
                    title={"Test case"}
                    register_id={"CASE 12345-1"}
                    function={null}
                    attachments={null} />);
        expect(latestCase.find('Card').length).toEqual(1);
    });

    it('Latest case should contain correct values', () => {
        const latestCase = shallow(<LatestCase url={"http://testurl.com"}
                    id={2}
                    data_source={"testSource"}
                    actions={null}
                    geometries={null}
                    created_at={"2017-01-1T10:00:00.00000Z"}
                    modified_at={"2017-01-1T10:00:00.00000Z"}
                    origin_id={"1"}
                    title={"Test case"}
                    register_id={"CASE 12345-1"}
                    function={null}
                    attachments={null}
                    subject={"Test subject"} />);
        expect(latestCase.find('Card').prop("label")).toEqual("CASE 12345-1");
        expect(latestCase.find('Card').props().description).toEqual(<Label>Test case</Label>);
        expect(latestCase.find('Card').props().heading).toEqual("Test subject");
    });

})
