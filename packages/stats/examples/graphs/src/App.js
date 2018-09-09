import React, { Component } from 'react';
import LinePlot from './linePlot';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Graphs</h1>
        </header>
        <LinePlot dragoId={'0x36c3057Ce3de417677cFDFE918F77Bf075cDBe22'} metric={'3_balance_ETH'} color={'blue'}/>
        <LinePlot dragoId={'0x71A01366EAcEb3405883F0951E194E4262123c5C'} metric={'3_balance_ETH'} />
      </div>
    );
  }
}

export default App;
