import './App.scss';
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from './Components/Home';
import Restaurant from './Components/Restaurant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;