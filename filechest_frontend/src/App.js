import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    folders: []
  };

  async componentDidMount()
  {
    try {
      const res = await fetch('http://127.0.0.1:8000/directory/', { method: 'GET' })
      const body = await res.json()
      this.setState({folders: body[0]["folders"]}) 
    } catch (e) {
      console.log(e)
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to FileChest!
          </p>
          {this.state.folders.map((folder) => (
            <p key={folder}>
              {folder}
            </p>
          ))}
        </header>
      </div>
    );
  }
}

export default App;