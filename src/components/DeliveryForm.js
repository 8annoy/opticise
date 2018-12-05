import React, {Component} from 'react';
import LocationSearchInput from './LocationSearchInput';
import { ClipLoader } from 'react-spinners';
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
        this.setState({loading: true, error: false})
        console.log({ origSelected, destSelected })
        Axios.post('/delivery', {  
                origin: origSelected.address, 
                destination: origSelected.address, 
                customer_id: 100
            },{responseType:'json'})
            .then(response => JSON.parse(response.data.body))
          .then(body => {
            console.log("Axios body", body);
            let stages = [];
            body.forEach(ride => {
                stages.push( { type: "move", img: "walk" , desc: `${ride.travel_mode} at ()`});
                stages.push( { type: "stop", desc: "Tel aviv, Central station"});
            })
            stages.pop();
            //response.json = () =>  ({price: '$5.99', pickup: '10:00', busRide: 'Bus 126 at 10:15', delivery: '14:00'});
            //const {price, pickup, busRide, delivery} = response.json();
            this.props.showRoute(body);

            this.setState({loading: false})
          })
          .catch(function (error) {
            console.log("Axios error", error);
          });
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
                    {this.state.loading ? 
                    <div className='sweet-loading'>
                        <ClipLoader
                        className={"asd"}
                        sizeUnit={"px"}
                        size={20}
                        color={'#123abc'}
                        loading={this.state.loading}
                        />
                    </div> :
                    <button type="submit" className="button">Deliverit</button>
                    }
                </div>
            </form>
            );
        }
    }
    
    export default DeliveryForm;