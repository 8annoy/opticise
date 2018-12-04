import React, {Component} from 'react';
import LocationSearchInput from './LocationSearchInput';
import '../styles/App.css';
import SearchBar from './SearchBar';

class DeliveryForm extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }
     
      render() {
        return (
          <form>
              <LocationSearchInput placeholder="Origin"/>
              <LocationSearchInput placeholder="Destination"/>
          </form>
        );
      }
}

export default DeliveryForm;