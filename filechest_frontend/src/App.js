import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      current_path: "",
    };
  }

  async componentDidMount()
  {
    try {
      const res = await fetch('http://127.0.0.1:8000/directory/', { method: 'GET' })
      const body = await res.json()
      this.setState({folders: body[0]["folders"]})
      console.log("initial")
      console.log(this.state.current_path)
    } catch (e) {
      console.log(e)
    }
  }

  async updateFolders(path) 
  { 
    this.state.current_path = path
    try {
      const res = await fetch('http://127.0.0.1:8000/directory/' + this.state.current_path, { method: 'GET' })
      const body = await res.json()
      this.setState({folders: body[0]["folders"]})
      console.log(this.state.current_path)
      console.log("update")
      console.log(this.state.folders)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to FileChest!
          </p>
          {this.state.folders.map((folder) => (
            <button key={folder + "button"} onClick={() => this.updateFolders(`${this.state.current_path}${folder}/`)}>
              <p key={folder}>
                {folder}
              </p>
            </button>
          ))}
          <button key="return_button" onClick={() => this.updateFolders(this.state.current_path.split("/").slice(0, -2).join("/"))}>
              <p key="return">
                return
              </p>
            </button>
        </header>
      </div>
    );
  }
}

export default App;