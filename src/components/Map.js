import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  map: {
    position: 'absolute',
    width: 'calc(100% - 265px)',
    height: '100%',
    right: '15px',
    border: '1px solid black'
  }
};
export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    /*if (prevProps.currentLocation !== this.props.currentLocation) {
      this.recenterMap();
    }*/

    if (prevProps.points !== this.props.points) {
      this.recenterMap();
    }
  }

  setBounds() {
    const {points} = this.props;
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      points[i] && bounds.extend(points[i]);
    }
    this.setState({bounds})
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.props.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          options: {mapTypeControl: false},
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  recenterMap() {
    const map = this.map;
    const {points} = this.props;
      var bounds = new this.props.google.maps.LatLngBounds();
      for (var i = 0; i < points.length; i++) {
        points[i] && bounds.extend(points[i]);
      }
    map.fitBounds(bounds);

  }

  renderChildren() {
    const { children } = this.props;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, Object.assign({
        map: this.map,
        google: this.props.google,
        mapCenter: this.props.currentLocation
      }))
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);

    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 16,
  initialCenter: {
    lat: 0,
    lng: 0
  },
  centerAroundCurrentLocation: false,
  visible: true
};