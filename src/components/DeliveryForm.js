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
              <LocationSearchInput onSelect={origSelected} placeholder="Origin" 
                style={{padding: "10px", width: "100%"}}/>
              <LocationSearchInput onSelect={destSelected} placeholder="Destination" 
                style={{padding: "10px", width: "100%"}}/>
          </form>
        );
      }
}

export default DeliveryForm;