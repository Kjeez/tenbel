import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import WhyExist from '../sections/WhyExist';
import Competencies from '../sections/Competencies';
import Products from '../sections/Products';
import Flagship from '../sections/Flagship';
import Services from '../sections/Services';
import Partners from '../sections/Partners';
import Video from '../sections/Video';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import RemoteConnectivity from '../sections/RemoteConnectivity';

export default function Home() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <WhyExist />
      <Competencies />
      <Products />
      <Flagship />
      <Services />
      <RemoteConnectivity />
      <Partners />
      <Video />
      <Contact />
      <Footer />
    </div>
  );
}
