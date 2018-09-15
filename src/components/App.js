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
          <h1 className="App-title">Guess what, it's a Chart :-)</h1>
          <p className="App-intro">
            Take a look at this simple histogram, depicting the amount of active transports per hour.
          </p>
        </header>
        <div className="chart-container">
          <Histogram  data={data}></Histogram>
        </div>
      </div>
    );
  }
}

export default App;