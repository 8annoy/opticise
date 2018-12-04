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
    const { origLatLang, destLatLang } = this.state;
    return (
      <div className="App">
        <div className="sidebar">
          <div className="App-header">
            <div className="App-title">Deliverit</div>
            <div className="app-description">Public Transportation Deliveries</div>
            <hr/>
            <DeliveryForm 
              origSelected={(origLatLang) => this.setState({origLatLang})} 
              destSelected={(destLatLang) => this.setState({destLatLang})}/>
          </div>
        </div>
        <CurrentLocation centerAroundCurrentLocation 
            google={this.props.google} 
            currentLocation={this.state.origLatLang}
            points={[origLatLang, destLatLang]}>
          <Marker onClick={this.onMarkerClick} name={'current location'} position={origLatLang} />
          <Marker onClick={this.onMarkerClick} name={'current location'} position={destLatLang} />
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
