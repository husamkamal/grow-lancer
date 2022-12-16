import {
  Hero, JoinClient, JoinFreelance, PopularCategories,
} from '../../components';
import Header from '../../components/landing/Header';
import './style.css';

function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <PopularCategories />
      <JoinFreelance />
      <JoinClient />
    </>
  );
}

export default Landing;
