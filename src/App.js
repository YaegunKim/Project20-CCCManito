import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import RandomMatch from "./components/RandomMatch";
import FindManito from "./components/FindManito";
import MatchResult from "./components/MatchResult";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/randomMatch" element={<RandomMatch />} />
          <Route path="/findManito" element={<FindManito />} />
          <Route path="/matchResult/:id" element={<MatchResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;