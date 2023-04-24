import { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav>
        <li>
          <Link to={`/directory/`}>welcome</Link>
        </li>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>FileChest</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/directory/*" element={<Folder />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

function Folder() {
  const [folders, setFolders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log(location)
    if (location.pathname.at(-1) !== '/')
    {
      location.pathname += '/'
    }

    fetch(`http://127.0.0.1:8000${location.pathname}`)
      .then((res) => res.json())
      .then((res) => setFolders(res['folders']))
  }, [location]);

  return (
    <div>
      <nav>
      {folders.map((folder) => (
        <div>
          <li>
            <Link to={`${location.pathname}${folder.name}`}>{folder.name}</Link>
          </li>
        </div>
      ))}
      </nav>
    </div>
  );
}