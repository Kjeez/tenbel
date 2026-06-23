import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import WhyExist from '../sections/WhyExist';
import Competencies from '../sections/Competencies';
import Products from '../sections/Products';
import Flagship from '../sections/Flagship';
import Services from '../sections/Services';
import Partners from '../sections/Partners';

import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import RemoteConnectivity from '../sections/RemoteConnectivity';

export default function Home() {
  return (
    <main className="relative bg-white">
      <Navigation />
      <Hero />
      <Flagship />
      <Competencies />
      <Products />
      <Services />
      <RemoteConnectivity />
      <Partners />
      <WhyExist />
      <Contact />
      <Footer />
    </main>
  );
}
