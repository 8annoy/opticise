import React, {Component} from 'react';
import LocationSearchInput from './LocationSearchInput';
import '../styles/App.css';
import ErrorImg from '../images/orange-error-icon.png'
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
        if (!origSelected || !destSelected) {
            this.setState({error: true})
            return false;
        }
        console.log({ origSelected, destSelected })
        Axios.post('/newDelivery', {  
                origin: origSelected.address, 
                destination: origSelected.address, 
                customer_id: 100
            })
          .then(function (response) {
            console.log(response);
            response.json = () =>  ({price: '$5.99', pickup: '10:00', busRide: 'Bus 126 at 10:15', delivery: '14:00'});
            const {price, pickup, busRide, delivery} = response.json();
            props.showRoute({price, pickup, busRide, delivery});
          })
          .catch(function (error) {
            console.log(error);
          });
          this.setState({error: false})
        return false;
    }
    
    origSelected = (selection) => {
        const { origSelected } = this.props;
        this.setState({origSelected: selection});
        origSelected(selection.latLng);
    }

    destSelected = (selection) => {
        const { destSelected } = this.props;
        this.setState({destSelected: selection});
        destSelected(selection.latLng);
    }

    render() {
        //const { origSelected, destSelected } = this.props;
        return (
            <form onSubmit={this.submit} className="delivery-form">
                <div className="rectangle">
                    <span className="input-label">From:</span>
                    <LocationSearchInput onSelect={this.origSelected}
                        style={{flex: "1 1 auto"}}/>
                </div>

                <div className="rectangle">
                    <span className="input-label">To:</span>
                    <LocationSearchInput onSelect={this.destSelected}
                        style={{flex: "1 1 auto"}}/>
                </div>
                <div style={{alignSelf: "flex-end"}}>
                    {this.state.error && <img style={{height: "18px", margin: "5px"}} src={ErrorImg}/>}
                    <button type="submit" className="button">Deliverit</button>
                </div>
            </form>
            );
        }
    }
    
    export default DeliveryForm;