import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, User, Home, FileText, Heart, PlusSquare } from 'react-feather';
import backgroundImage from '../assets/doguinhos.png';
import logo from './logo.png'; // [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/sospets-react/src/pages/logo.png]
import './HomePage.css'; // [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/sospets-react/src/pages/HomePage.css]

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="SOS Pets Logo" className="home-logo" />
        <div className="search-bar">
          <input type="text" placeholder="Pesquisar..." />
        </div>
      </header>

      <main className="home-grid" style={{ backgroundImage: `url(${backgroundImage})` }}>
        
        <Link to="/pets" className="menu-card">
          <GitHub size={48} /> 
          <span>Pet</span>
        </Link>

        <Link to="/tutores" className="menu-card">
          <User size={48} />
          <span>Tutor</span>
        </Link>
        
        <Link to="/clinicas" className="menu-card">
          <PlusSquare size={48} />
          <span>Clínicas</span>
        </Link>
        
        {/* LINK CORRIGIDO */}
        <Link to="/colaboradores" className="menu-card">
          <Home size={48} />
          <span>Colaboradores</span>
        </Link>

        <Link to="/relatorios" className="menu-card">
          <FileText size={48} />
          <span>Relatórios</span>
        </Link>

        <Link to="/atendimentos" className="menu-card">
          <Heart size={48} />
          <span>Atendimentos</span>
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
