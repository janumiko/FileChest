import { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = () => {
  const [folders, setFolders] = useState([]);
  useEffect(() => {
      fetch('http://127.0.0.1:8000/directory/')
          .then((res) => res.json())
          .then((res) => setFolders(res[0]['folders']))
  }, []);

  return (
    <div>
      <nav>
      {folders.map((item) => (
        <div>
          <li>
            <Link to={`/${item}`}>{item}</Link>
          </li>
        </div>
      ))}
      </nav>
    </div>
  );
};

const App = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
      fetch('http://127.0.0.1:8000/directory/')
          .then((res) => res.json())
          .then((res) => setFolders(res[0]['folders']))
  }, []);

  return (
    <div>
      <h1>FileChest</h1>
      <Router>
        <Routes>
          <Route index element={<Home/>}></Route>
          {folders.map((folder) => (
            <Route
                key={folder}
                path={`/${folder}`}
                element={<Folder path = {`${folder}/`} />}
            >
            </Route>
          ))}
          <Route element={<p>This seems wrong</p>}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

function Folder({path}) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
        fetch(`http://127.0.0.1:8000/directory/${path}`)
            .then((res) => res.json())
            .then((res) => setFolders(res[0]['folders']))
  }, [path]);

  return (
    <div>
      <nav>
      {folders.map((folder) => (
        <div>
          <li>
            <Link to={`${folder}`}>{folder}</Link>
          </li>
        </div>
      ))}
      </nav>
      <Routes>
          {folders.map((folder) => (
              <Route
                  key={`path/folder`}
                  path={`${Folder}`}
                  element={<Folder path = {`${path}/${folder}/`} />}
              >
              </Route>
          ))}
      </Routes>
    </div>
  );
}