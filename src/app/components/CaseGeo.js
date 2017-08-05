import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';


export default class CaseGeo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        point: null,
        polygon: null,
        name: ''
    };
  }


  componentWillMount = () => {
      const geometries = this.props.geometries;
      let point = [];
      let name = '';
      const polygon = [];

      if (geometries.length > 0) {
          geometries.map(function (geo) {
            if (geo.geometry.type === 'Point') {
                point = geo.geometry.coordinates;
                name = geo.name;
            } else {
                geo.geometry.coordinates[0].map(function (latLng) {
                    const reverse = [latLng[1], latLng[0]];
                    polygon.push(reverse);
                });
            }
          });
        this.setState({point, name, polygon});
      }

  }

  render () {
    const reversePoint = this.state.point;
    const point = reversePoint ? [reversePoint[1], reversePoint[0]] : [];
    const polygon = this.state.polygon;

    return (
        this.state.point
        && <Map center={point ? point : polygon[0]} zoom={16} style={{height: '300px'}}>
            <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {point
            && <Marker position={point}>
                <Popup>
                    <span>{this.state.name}</span>
                </Popup>
            </Marker>}
            {polygon
            && <Polygon color="purple" positions={polygon} />
            }
        </Map>
    );
  }
}

CaseGeo.propTypes = {
    geometries: PropTypes.array
};
