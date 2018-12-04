import React, {Component} from 'react';
import LocationSearchInput from './LocationSearchInput';
import '../styles/App.css';

class DeliveryForm extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }
     
      render() {
          const { origSelected, destSelected } = this.props;
        return (
          <form>
              <LocationSearchInput onSelect={origSelected} placeholder="Origin"/>
              <LocationSearchInput onSelect={destSelected} placeholder="Destination"/>
          </form>
        );
      }
}

export default DeliveryForm;