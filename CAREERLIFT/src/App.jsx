import "./App.css";
import Navbar from "./components/Navbar/Navbarhome";
import Home from "./components/Navbar/Home";
import About from "./components/Navbar/About";
import Services from "./components/Navbar/Services";
import FAQ from "./components/Navbar/FAQ";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Home />
        <About />
        <Services />
        <FAQ />
      </div>
    </>
  );
}

export default App;
