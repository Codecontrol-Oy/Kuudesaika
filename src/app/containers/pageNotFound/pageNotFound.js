import React from 'react';
import { connect } from 'react-redux'

@connect((store) => {
    return  {
    };
})

class PageNotFound extends React.Component {

    constructor(props) {
        super(props);
    }  

    render() {
      return (  
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <span>Page not found!</span>
        </div>
      )};

};

export default PageNotFound;