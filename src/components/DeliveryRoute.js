import React, {Component} from 'react';
import '../styles/App.css';
import BikeImg from '../images/bike.svg';
import BusImg from '../images/bus.png';

const s = {
    main: {
        margin: "36px 0 0 18px",
        fontFamily: '"Helvetica Neue"',
    },
    top: {
        display: "flex",
        height: "28px",
        width: "215px",
        color: "#6D6D6D",
        fontSize: "24px",
        fontWeight: "300",
        lineHeight: "29px",
        margin: "0 0 25px 0",
    },
    location: {
        fontSize: "14px",
        lineHeight: "16px"
    },
    stages: {
        margin: "20px 0 20px 40px",
        fontSize: "12px",
        lineHeight: "14px"
    },
    stop: {
        margin: "15px 0",
        height: "20px",
    },
    stopText: {
        fontSize: "14px"
    },
    move: {
        margin: "15px 0",
        height: "20px",
    },
    moveText: {
        fontStyle: "italic"
    },
    img: {
        height: "20px",
        width: "20px",
        margin: "0 5px"
    }

}

const Move = ({ img, desc }) => (
    <div style={s.move}>
        <img style={s.img} src={img} />
        <span style={s.moveText}>{desc}</span>
    </div>
);

const Stop = ({ img, desc }) => (
    <div style={s.stop}>
        <span style={s.stopText}>{desc}</span>
    </div>
);

class DeliveryRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 5,
            time: "10:00 - 14:20",
            origin: "Tel Aviv, Ben Yehuda 32",
            destination: "Haifa, Ben Yehuda 11",
            stages: [
                { type: "move", img: BikeImg , desc: "Pickup at 10:00 (15min)"},
                { type: "stop", desc: "Tel aviv, Central station"},
                { type: "move", img: BusImg , desc: "Bus 980 to haifa at 12:10, (1:23 h)"},
                { type: "stop", desc: "Haifa, Central station"},
                { type: "move", img: BikeImg , desc: "Delivery out 14:00 (20min)"},

            ]
        }
    }

    render() {
        const { origin, destination, stages, time, price } = this.state;
        return (
            <div style={s.main}>
                <div style={s.top}>
                    <span>{price}$</span>
                    <hr width="1" size="500"/>
                    <span>{time}</span>
                </div>
                <div style={s.location}>
                    <span style={{fontWeight:500, margin: "3px"}}>From:</span>
                    <span>{origin}</span>
                </div>
                <div style={s.stages}>
                    {stages.map(stage => (
                        (stage.type == "move" && <Move {...stage}/>) ||
                        (stage.type == "stop" && <Stop {...stage}/>)
                    ))}
                </div>
                <div style={s.location}>
                    <span style={{fontWeight:500, margin: "3px"}}>To:</span>
                    <span>{destination}</span>
                </div>
            </div>
            );
        }
    }
    
    export default DeliveryRoute;