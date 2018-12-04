import React, {Component} from 'react';
import LocationSearchInput from './LocationSearchInput';
import '../styles/App.css';
import Axios from 'axios';

class DeliveryForm extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    submit = (event) => {
        let props = this.props;
        event.preventDefault();
        const { origSelected, destSelected } = this.state;
        console.log({ origSelected, destSelected })
        Axios.post('/newDelivery', {
            origSelected, 
            destSelected
          })
          .then(response => {
            console.log(response);
            response.json = () =>  ({price: '$5.99', pickup: '10:00', busRide: 'Bus 126 at 10:15', delivery: '14:00'});
            const {price, pickup, busRide, delivery} = response.json();
            props.showRoute({price, pickup, busRide, delivery});
          })
          .catch(function (error) {
            console.log(error);
          });
        return false;
    }
    
    origSelected = (selection) => {
        const { origSelected } = this.props;
        this.setState({origSelected: selection});
        origSelected(selection);
    }

    destSelected = (selection) => {
        const { destSelected } = this.props;
        this.setState({destSelected: selection});
        destSelected(selection);
    }

    render() {
        //const { origSelected, destSelected } = this.props;
        return (
            <form onSubmit={this.submit} className="delivery-form">
                <div className="rectangle">
                    <span className="input-label">From:</span>
                    <LocationSearchInput onSelect={this.origSelected} placeholder="Origin" 
                        style={{flex: "1 1 auto"}}/>
                </div>

                <div className="rectangle">
                    <span className="input-label">To:</span>
                    <LocationSearchInput onSelect={this.destSelected} placeholder="Destination" 
                        style={{flex: "1 1 auto"}}/>
                </div>
                <button type="submit" className="button">Deliverit</button>
            </form>
            );
        }
    }
    
    export default DeliveryForm;