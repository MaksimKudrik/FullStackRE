import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Правильные импорты
import Home from './pages/Home.jsx';
import Electronics from './pages/Electronics.jsx';
import ElectronicsDetail from './pages/ElectronicsDetail.jsx';
import Header from './components/Header.jsx';     // ← исправлено
import Mechanics from './pages/Mechanics.jsx';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/electronics/:slug" element={<ElectronicsDetail />} />
        <Route path="/mechanics" element={<Mechanics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;