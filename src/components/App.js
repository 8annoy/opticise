import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import DeliveryForm from './DeliveryForm'
import '../styles/App.css';
import CurrentLocation from './Map';
import DeliveryRoute from './DeliveryRoute';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    origLatLang: {lat: 32.063835, lng: 34.780025},
    showRoute: false
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  showRoute = deliveryRoute => {
    let state = {...this.state, deliveryRoute, showRoute: true};
    console.log('state: ', state);
    this.setState(state);
  }

  displayDirections = () => (
    this.state.price ? 
    <div>
      price
    </div> : ''
  )

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = 'TRANSIT';
    directionsService.route({
      origin: {lat: 31.263125, lng: 34.802251},  // Haight.
      destination: {lat: 31.263125, lng: 34.802251},  // Ocean Beach.
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: this.props.google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  render() {
    const { origLatLang, destLatLang, deliveryRoute } = this.state;
    
    return (
      <div className="App">
        <div className="sidebar">
          <div className="App-header">
            <div className="App-title">Deliverit</div>
            <div className="public-transportation">Public Transportation Deliveries</div>
            <DeliveryForm
              origSelected={(origLatLang) => this.setState({origLatLang})} 
              destSelected={(destLatLang) => this.setState({destLatLang})}
              showRoute={this.showRoute}
              onRoute={(deliveryRoute) => this.setState({deliveryRoute})}/>
          </div>
          {deliveryRoute && <DeliveryRoute {...{deliveryRoute}}/>}
        </div>
        <CurrentLocation centerAroundCurrentLocation 
            google={this.props.google} 
            currentLocation={this.state.origLatLang}
            points={[origLatLang, destLatLang]}
            showRoute={this.state.showRoute}>
          <Marker position={origLatLang} />
          <Marker position={destLatLang} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBnOC2cYnLyaaYXtnd_IEQWZLkqvg0tqoE'
})(MapContainer);
