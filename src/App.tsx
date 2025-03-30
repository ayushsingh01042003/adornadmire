import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import Offers from './components/Offers';
import Products from './components/Products';
import ContactHours from './components/ContactHours';
import Blog from './components/Blog';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Services />
        <Offers />
        <Products />
        <ContactHours />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}

export default App;
