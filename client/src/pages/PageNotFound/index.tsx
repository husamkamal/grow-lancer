import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import notFoundError from '../../assets/404.png';

import './style.css';

function PageNotFound() {
  return (
    <div className="error-container">
      <img src={notFoundError} alt="404 error" className="not-found-err" />
      <p className="description">
        The page you were looking for could not be found. The page could be
        removed or you missbled the word while searching for it.
      </p>
      <Link to="/">
        <Button
          variant="contained"
          style={{
            backgroundColor: '#3A6FE6',
            color: '#fff',
            padding: '.6rem 2.4rem',
            marginTop: '15px',
          }}
        >
          Back Home
        </Button>

      </Link>

    </div>
  );
}

export default PageNotFound;
