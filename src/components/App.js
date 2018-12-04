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
    origLatLang: {
      lat: 32.0803408,
      lng: 34.780638700000054
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

  showRoute = deliveryRoute => {
    this.setState({deliveryRoute});
    console.log("showRoute",deliveryRoute);
  }

  displayDirections = () => (
    this.state.price ? 
    <div>
      price
    </div> : ''
  )

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
