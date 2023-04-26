import { Link } from 'react-router-dom';

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

export default Home;
