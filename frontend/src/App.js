import { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const BACKEND_URL = "http://127.0.0.1:8000"

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
  const [items, setItems] = useState({"folders": [], "files": []});
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.at(-1) !== '/')
    {
      location.pathname += '/'
    }

    fetch(`${BACKEND_URL}${location.pathname}`)
      .then((res) => res.json())
      .then((res) => setItems({folders: res['folders'], files: res['files']}))
  }, [location]);

  return (
    <div>
      <nav>
      {items["folders"].map((folder) => (
        <div>
          <li>
            <Link to={`${location.pathname}${folder.name}`}>{folder.name}</Link>
          </li>
        </div>
      ))}
      {items["files"].map((file) => (
        <div>
          <li>
            <Link to={`${BACKEND_URL}${location.pathname.replace("directory", "view")}${file.name}`}>{file.name}</Link>
          </li>
        </div>
      ))}
      </nav>
    </div>
  );
}