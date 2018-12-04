import React, {Component} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import '../styles/App.css';

class LocationSearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
      }
     
      handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        this.setState({ isGeocoding: true, address });
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            console.log('Success', latLng);
            this.props.onSelect({latLng, address});
          })
          .catch(error => console.error('Error', error));
      };
     
      render() {
        const {placeholder, style} = this.props;
        return (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div style={style} className="search-input-container" >
                <input className="search-input"
                  {...getInputProps({
                    placeholder
                  })}
                />
                <div className="autocomplete-container">
                  {loading && <div className="suggestion-item">Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                      {...getSuggestionItemProps(suggestion, { className })}
                    >
                      <strong>
                        {suggestion.formattedSuggestion.mainText}
                      </strong>{' '}
                      <small>
                        {suggestion.formattedSuggestion.secondaryText}
                      </small>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
    }
}

export default LocationSearchInput;