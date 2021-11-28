import './index.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import CreateBook from './pages/createbook/CreateBook';
import ViewBook from './pages/viewbook/ViewBook';

function App() {
  const [id, setId] = useState()

  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home setId={setId} id={id} />} />
      <Route path="/createbook" element={<CreateBook />} />
      <Route path="/viewbook/:id" element={<ViewBook id={id} />} />
    </Routes>
  </Router>
  );
}

export default App;
