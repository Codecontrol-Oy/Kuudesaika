import React from 'react';

export default class PageNotFoundContainer extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
      return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <span>Page not found!</span>
        </div>
      );}

}
