import { Link } from 'react-router-dom';
import './style.css';

interface Props {
  msg: string
}
function NotFound({ msg }: Props) {
  return (
    <div className="not-found-comp">
      <h1>404</h1>
      <p>{msg}</p>
      <Link className="go-home" to="/">Go Home</Link>

    </div>
  );
}

export default NotFound;
