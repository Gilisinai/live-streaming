import React, { Component } from 'react';
import './App.css';
import DataTable from './DataTable';
import io from 'socket.io-client'

class App extends Component {

  state = {
    data: [],
    key: 'trial',
    
  }

  async componentDidMount() {
    await this.openSocket(this.state.key)
    
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
        } else {    
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

  


  render() {

    const { data,example } = this.state
    return (
      <div className="App">
        <DataTable data={data} />
       
      </div>
    );
  }
}

export default App;
