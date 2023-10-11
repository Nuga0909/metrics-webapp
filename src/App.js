import { Routes, Route } from 'react-router-dom';
import Home from './components/Homepage';
import CountryDetails from './components/Countrydetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:countryId" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
