import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Folder from './Folder';
import NotFound from './NotFound';

const App = () => {
  return (
    <div>
      <Layout />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/directory/*" element={<Folder />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

