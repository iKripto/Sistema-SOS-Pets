import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PetPage from './pages/PetPage';
import PetForm from './pages/PetForm';
import TutorPage from './pages/TutorPage';
import TutorForm from './pages/TutorForm';
import ClinicPage from './pages/ClinicPage';
import ClinicForm from './pages/ClinicForm';
// --- Correções e adições ---
import CollaboratorPage from './pages/Collaborator';
import CollaboratorForm from './pages/CollaboratorForm.js'; // ATENÇÃO: Corrigido, removi a vírgula do nome do arquivo. Se o arquivo realmente tiver uma vírgula, ajuste aqui.

import AtendimentoPage from './pages/AtendimentoPage.js';
import AtendimentoForm from './pages/AtendimentoForm.js';

import './App.css';
import RelatoriosPage from './pages/RelatoriosPage.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rotas de Login e Home --- */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />

        {/* --- Rotas de Pets --- */}
        <Route path="/pets" element={isAuthenticated ? <PetPage /> : <Navigate to="/login" replace />} />
        <Route path="/pets/novo" element={isAuthenticated ? <PetForm /> : <Navigate to="/login" replace />} />
        <Route path="/pets/editar/:id" element={isAuthenticated ? <PetForm /> : <Navigate to="/login" replace />} />
        
        {/* --- Rotas de Tutores --- */}
        <Route path="/tutores" element={isAuthenticated ? <TutorPage /> : <Navigate to="/login" replace />} />
        <Route path="/tutores/novo" element={isAuthenticated ? <TutorForm /> : <Navigate to="/login" replace />} />
        <Route path="/tutores/editar/:cpf" element={isAuthenticated ? <TutorForm /> : <Navigate to="/login" replace />} />
        
        {/* --- Rotas de Clínicas --- */}
        <Route
          path="/clinicas"
          element={
            isAuthenticated ? <ClinicPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/clinicas/novo"
          element={
            isAuthenticated ? <ClinicForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/clinicas/editar/:id"
          element={
            isAuthenticated ? <ClinicForm /> : <Navigate to="/login" replace />
          }
        />

        {/* --- ROTAS DE COLABORADORES (Adicionadas) --- */}
        <Route
          path="/colaboradores"
          element={
            isAuthenticated ? <CollaboratorPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/colaboradores/novo"
          element={
            isAuthenticated ? <CollaboratorForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/colaboradores/editar/:cpf"
          element={
            isAuthenticated ? <CollaboratorForm /> : <Navigate to="/login" replace />
          }
        />

        {/* --- ROTAS DE RELATÓRIOS E ATENDIMENTOS (Adicionadas) --- */}
        <Route
          path="/relatorios"
          element={
            isAuthenticated ? <RelatoriosPage/> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/atendimentos"
          element={
            isAuthenticated ? <AtendimentoPage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/atendimentos/editar/:id"
          element={
            isAuthenticated ? <AtendimentoForm /> : <Navigate to="/login" replace />
          }
        />  

        <Route
          path="/atendimentos/novo"
          element={isAuthenticated ? <AtendimentoForm /> : <Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
