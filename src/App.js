import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Predict from './components/Predict';
import LoginSignUp from './components/LoginSignUp';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/auth" element={<LoginSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
