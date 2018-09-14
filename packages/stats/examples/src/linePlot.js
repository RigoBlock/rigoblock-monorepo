import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import axios from 'axios'

class LinePlot extends Component {
  componentDidMount() {
    this.interval = setInterval(this.refreshGraph, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  refreshGraph = async () => {
    const response = await axios.get('http://influx-db-endpoint:8086/query?pretty=true', {
      params: {
        db: 'telegraf',
        q: `SELECT mean("value") AS "mean_value"` +
          ` FROM "telegraf"."autogen"."${this.props.metric}"` +
          ` WHERE time > now() - 5m AND time < now()` +
          ` AND "id"='${this.props.dragoId}'` +
          ` AND "currency"='${this.props.currency}'` +
          ` AND "network"='${this.props.network}'` +
          ` GROUP BY time(500ms) FILL(previous)`
      }
    })

    if (response.data.results && response.data.results.length) {
      this.setState({
        data: response.data.results[0].series
      })
    }
  }

  render() {
    const data = this.state && this.state.data && this.state.data.length ? this.state.data[0].values : []
    const filteredData = data.filter(d => d[1] !== null)
    const x = filteredData.map(d => d[0])
    const y = filteredData.map(d => d[1])
    return (
      <Plot
        data={[
          {
            x,
            y,
            type: 'scatter',
            mode: 'lines',
            marker: { color: this.props.color },
          },
        ]}
        layout={{ width: 1024, height: 400, title: `Balance for drago ${this.props.dragoId}` }}
      />
    );
  }
}

LinePlot.defaultProps = {
  dragoId: '',
  metric: '',
  currency: '',
  network: '',
  color: 'red'
}

export default LinePlot;
