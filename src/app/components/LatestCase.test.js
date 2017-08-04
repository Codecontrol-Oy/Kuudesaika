import React from 'react';
import LatestCase from './LatestCase';
import renderer from 'react-test-renderer';



test("Latest case has correct fields", () =>  {
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
