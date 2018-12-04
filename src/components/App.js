import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import DeliveryForm from './DeliveryForm'
import '../styles/App.css';
import CurrentLocation from './Map';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    origLatLang: {
      lat: "", lng: ""
    }
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

  render() {
    return (
      <div className="App">
        <div className="map-form App-header">
          <h1 className="App-title">Deliverit</h1>
          <h4>Public Transportation Deliveries</h4>
          <hr/>
          <DeliveryForm 
            origSelected={(origLatLang) => this.setState({origLatLang})} 
            destSelected={(destLatLang) => this.setState({destLatLang})}/>
        </div>
        <CurrentLocation centerAroundCurrentLocation 
            google={this.props.google} 
            currentLocation={this.state.origLatLang}>
          <Marker onClick={this.onMarkerClick} name={'current location'} />
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
