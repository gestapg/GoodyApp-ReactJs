// import classes from './Header.module.css';
// import cover from './cover.png';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div
      className="hero h-96"
      style={{
        backgroundImage: `url(${'https://picsum.photos/id/1005/1600/1400'})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Our Collections</h1>
          <p className="mb-5">
            Thanks for visiting us! The GoodyApp will guide you to find a good
            stuff from head to toe
          </p>
          <Link to={'/add-item'} className="btn btn-primary">
            Add an Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
