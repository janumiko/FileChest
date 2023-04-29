import {createBrowserRouter, Link} from "react-router-dom";


const HomePage = () => {
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


const ErrorPage = () => {
  return (
    <section>
      <p>error happened!</p>
    </section>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
    ],
  },
]);

export default router;