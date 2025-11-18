import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import './Login.css';
import backgroundImage from '../assets/doguinhos.png'; // Mantive sua imagem 'doguinhos.png'

const LoginPage = ({ onLoginSuccess }) => {
  const [error, setError] = useState(''); // ESTADO INICIALIZADO AQUI

  const handleLogin = async (username, password) => {
    setError('');

    // Assumindo que você corrigiu esta parte para usar BASE_API_URL:
    const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const API_URL = `${BASE_API_URL}/funcionarios/${username}`; 
    // O endpoint de busca é "/{cpf}"

    try {
      const response = await fetch(API_URL);

      if (response.ok) {
        const funcionario = await response.json(); // 1. OBTÉM OS DADOS DO USUÁRIO

        // 2. VERIFICAÇÃO DA SENHA: (Agora o campo 'senha' é usado na comparação)
        if (funcionario.senha === password) { 
          console.log('Login bem-sucedido! Redirecionando para a home...');
          
          // 3. SE AS SENHAS BATEREM, CHAMA O SUCESSO
          onLoginSuccess();

        } else {
          // Senha digitada está incorreta
          throw new Error('Usuário ou senha incorretos!'); 
        }

      } else {
        // Erro HTTP (404 Not Found - CPF não existe)
        throw new Error('Usuário ou senha incorretos!');
      }

    } catch (err) {
      if (err.message === 'Usuário ou senha incorretos!') {
        setError(err.message); 
      } else {
        console.error('Erro de conexão:', err);
        setError('Não foi possível conectar ao servidor. Tente novamente.');
      }
    }
  }; // FIM DA handleLogin

  return ( // RETORNO DO COMPONENTE
    <div className="login-page">
      <div
        className="login-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="login-container">
        <LoginForm onSubmit={handleLogin} error={error} />
      </div>
    </div>
  );
};

export default LoginPage;