import React from 'react';
import Spinning from 'grommet/components/icons/Spinning';

export default class Loader extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
            <div>
              <Spinning size={"medium"} />
              <span>LADATAAN...</span>
            </div>
    );
  }
}
