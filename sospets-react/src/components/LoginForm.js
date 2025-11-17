import React, { useState } from 'react';
import { User, Lock } from 'react-feather'; // Importando ícones

const LoginForm = ({ onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(username, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      
      <div className="login-user-icon">
        <User size={48} color="#555" />
      </div>

      <div className="input-group">
        <User size={18} className="input-icon" />
        <input
          type="text"
          placeholder='Login'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <Lock size={18} className="input-icon" />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="login-options">
        <input type="checkbox" id="rememberUser" />
        <label htmlFor="rememberUser">Lembrar usuário</label>
      </div>

      <button type="submit" className="login-button">
        ENTRAR NO SISTEMA
      </button>

      {error && <p className="login-error">{error}</p>}
    </form>
  );
};

export default LoginForm;