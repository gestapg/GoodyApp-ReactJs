import Footer from './Footer';
import Navigation from './Navigation';

const Layout = props => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
