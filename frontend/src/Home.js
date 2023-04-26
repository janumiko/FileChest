import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Section>
      <nav>
        <li>
          <Link to={`/directory/`}>welcome</Link>
        </li>
      </nav>
    </Section>
  );
};

export default Home;
