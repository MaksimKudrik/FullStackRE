// src/components/Header.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Логотип */}
        <NavLink to="/" className="logo">
          <div className="logo-icon"><img  className="logo__"src="images/Boxes.svg" alt="icon" /></div>
        </NavLink>
        {/* Десктопное меню */}
        <nav className="nav-links">
          <NavLink to="/" className="nav-link" onClick={closeMenu}>Главная</NavLink>
          <NavLink to="/electronics/bol-shoy-servomotor-1" className="nav-link" onClick={closeMenu}>Большой сервомотор</NavLink>
          <NavLink to="/electronics/sredniy-servomotor-2" className="nav-link" onClick={closeMenu}>Средний сервомотор</NavLink>
          <NavLink to="/electronics/datchik-cveta-3" className="nav-link" onClick={closeMenu}>Датчик цвета</NavLink>
          <NavLink to="/electronics/datchik-nazhatiya-4" className="nav-link" onClick={closeMenu}>Датчик нажатия</NavLink>
          <NavLink to="/electronics/datchik-rasstoyaniya-5" className="nav-link" onClick={closeMenu}>Датчик расстояния</NavLink>
        </nav>

        {/* Гамбургер — только для мобильных */}
        <button 
          onClick={toggleMenu} 
          className="hamburger"
          aria-label="Открыть меню"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Мобильное меню */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <NavLink to="/" className="nav-link" onClick={closeMenu}>Главная</NavLink>
          <NavLink to="/electronics/bol-shoy-servomotor-1" className="nav-link" onClick={closeMenu}>Большой сервомотор</NavLink>
          <NavLink to="/electronics/sredniy-servomotor-2" className="nav-link" onClick={closeMenu}>Средний сервомотор</NavLink>
          <NavLink to="/electronics/datchik-cveta-3" className="nav-link" onClick={closeMenu}>Датчик цвета</NavLink>
          <NavLink to="/electronics/datchik-nazhatiya-4" className="nav-link" onClick={closeMenu}>Датчик нажатия</NavLink>
          <NavLink to="/electronics/datchik-rasstoyaniya-5" className="nav-link" onClick={closeMenu}>Датчик расстояния</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;