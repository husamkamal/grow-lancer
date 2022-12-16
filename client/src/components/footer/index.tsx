import { Link } from 'react-router-dom';
import { FaCaretRight } from 'react-icons/fa';
import logo from '../../assets/logo2.png';
import data from '../../categoris';
import './style.css';

function Footer() {
  const handelCategoryItem = () => {
    const categoryItem = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 3; index++) {
      categoryItem.push(data[index].name);
    }
    return categoryItem;
  };
  return (
    <footer>
      <div className="footer">
        <div className="logo">
          <Link to="/">
            {' '}
            <img src={logo} alt="logo footer" />
          </Link>

        </div>
        <div className="footer-bar">
          <div className="footer-menu">
            <h4>Menu</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs-search">Search</Link></li>
              {/* to send email */}
              <li><a href="mailto:glancer@support.com">Help</a></li>
            </ul>
          </div>
          <div className="footer-category">
            <h4>Category</h4>
            <ul>
              {handelCategoryItem().map((el) => (
                <li key={el}>
                  <Link to="/jobs-search" state={{ category: el }}>
                    {el}
                  </Link>
                </li>
              ))}

            </ul>
          </div>
          <div className="footer-help">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <FaCaretRight className="arrow__icon" />
                Palestine - Gaza
              </li>
              <li>
                <FaCaretRight className="arrow__icon" />
                glancer@support.com
              </li>
              <li>
                <FaCaretRight className="arrow__icon" />
                +972 - 592 - 100 - 223
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
