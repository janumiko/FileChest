import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotFound from './NotFound';


const BACKEND_URL = "http://127.0.0.1:8000"

const Folder = () => {
  const [items, setItems] = useState({ "folders": [], "files": [] });
  const location = useLocation();
  const [error, setError] = useState(false)

  useEffect(() => {
    if (location.pathname.at(-1) !== '/') {
      location.pathname += '/'
    }

    fetch(`${BACKEND_URL}${location.pathname}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res)
        }
        return res.json()
      })
      .then((res) => setItems({ folders: res['folders'], files: res['files'] }))
      .catch((error) => { console.log(error); setError(true) })

  }, [location]);

  if (error) {
    return (<NotFound />)
  }

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

export default Folder;
