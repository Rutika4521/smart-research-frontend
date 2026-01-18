import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sections from "./pages/Sections";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/results/:section" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
