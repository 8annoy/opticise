import React from 'react';
import Histogram from './Histogram';
import buildDataset from '../algorithm';
import '../styles/App.css';

class App extends React.Component {
  
  state = {
    data: []
  };

  componentDidMount() {
    let context = this;
    buildDataset().then(data => {
      context.setState({
        data: data
      });
    });
  }
  
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <span><h1 className="App-title">Deliverit | </h1><h4>Public Transportation Deliveries</h4></span>
        </header>
        <div className="map-form">
          
        </div>
        <div className="map-instance">

        </div>
      </div>
    );
  }
}

export default App;