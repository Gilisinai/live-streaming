import React, { Component } from 'react';
import './App.css';
import DataTable from './Table';
import io from 'socket.io-client'

class App extends Component {

  state = {
    data: [],
    key: 'trial',
    example: []
  }

  async componentDidMount() {
    await this.openSocket(this.state.key)
    // this.example()
  }

  openSocket = (key) => {

    const socket = io('https://wss.live-rates.com/')
    socket.on('connect', function () {

      
      let instruments = ['EURUSD', 'USDJPY', 'BTCUSD', 'ETH']
      socket.emit('instruments', instruments);

      socket.emit('key', key);
    });

    socket.on('rates', (msg) => {


      try {
        let data = JSON.parse(msg);
        let dataArr = [...this.state.data]
        let itemToUpdate = dataArr.find(item => item['currency'] === data['currency'])

        if(itemToUpdate == undefined) {
          dataArr.push(data)
          // console.log(`found element: ${foundWhereToUpdate.currency}`)
        } else {
          // console.log(foundWhereToUpdate.currency, foundWhereToUpdate.bid)
          let index = dataArr.indexOf(itemToUpdate)
          dataArr[index] = data
        }
        
        this.setState({
          data: dataArr
        })

      } catch (e) {
        console.log(msg)
      }

    });

  }

  example = () => {
    setInterval(() => {
      let currencyData = this.exampleResponse()
      let exampleData = [...this.state.example]
      let itemToUpdate = exampleData.find(example => example['currency'] === currencyData['currency'])
      
      if(itemToUpdate == undefined) {
        exampleData.push(currencyData)
        // console.log(`found element: ${foundWhereToUpdate.currency}`)
      } else {
        // console.log(foundWhereToUpdate.currency, foundWhereToUpdate.bid)
        let index = exampleData.indexOf(itemToUpdate)
        exampleData[index] = currencyData
      }

      
      
      this.setState({
        example: exampleData
      })
    }, 1000)
  }

  exampleResponse = () => {
    let currency = ['EURUSD', 'USDJPY', 'BTCUSD', 'ETH']
    return this.createData(currency[this.getRandomInt(currency.length)], Math.random(), Math.random(), Math.random(),Math.random(),)

  }

  createData = (currency, bid, ask, high, low) => {

    return { currency, bid, ask, high, low };
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }


  render() {

    const { data,example } = this.state
    return (
      <div className="App">
        <DataTable data={data} />
        {/* <DataTable data={example} /> */}
      </div>
    );
  }
}

export default App;
