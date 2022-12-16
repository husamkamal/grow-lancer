import { Button } from '@mui/material';
import './style.css';

interface Propos {
  label: string
  onClick: any
  type: 'github' | 'google'
}
function OauthLoginBtn({ label, onClick, type }: Propos) {
  return (
    <Button className="google-btn" onClick={onClick}>
      {' '}
      <img
        className="google-icon"
        src={type === 'google'
          ? 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
          : 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'}
        alt="btn"
      />
      <p className="btn-text">
        <b>
          {label}
          {' '}
          with
          {' '}
          {type}
        </b>
      </p>

    </Button>
  );
}

export default OauthLoginBtn;
