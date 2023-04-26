import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Folder from './Folder';

const App = () => {
  return (
    <div>
      <Layout />
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

