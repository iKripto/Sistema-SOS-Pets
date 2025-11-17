import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import './Login.css';
import backgroundImage from '../assets/doguinhos.png'; // Mantive sua imagem 'doguinhos.png'

const LoginPage = ({ onLoginSuccess }) => {
  const [error, setError] = useState('');

  const handleLogin = async (username, password) => {
    // 'username' é o CPF, conforme a narrativa de caso de uso
    setError('');

    // O servidor Spring Boot roda na porta 8080 por padrão.
    // O controller é "/funcionarios"
    // O endpoint de busca é "/{cpf}"
    const API_URL = `http://localhost:8080/funcionarios/${username}`;

    try {
      const response = await fetch(API_URL);

      // T1 - O sistema verifica se as informações de login estão cadastradas
      if (response.ok) {
        // Usuário (Funcionario) encontrado!
        console.log('Login bem-sucedido! Redirecionando para a home...');
        
        // Chama a função do App.js para sinalizar o sucesso
        onLoginSuccess();

      } else {
        // Erro HTTP (ex: 404 Not Found)
        // E1 - Login do usuário não validado
        throw new Error('Usuário ou senha incorretos!');
      }

    } catch (err) {
      // Trata o erro 'throw new Error' ou erros de rede (ex: API desligada)
      if (err.message === 'Usuário ou senha incorretos!') {
        setError(err.message); // Exibe a mensagem da documentação
      } else {
        console.error('Erro de conexão:', err);
        setError('Não foi possível conectar ao servidor. Tente novamente.');
      }
    }
  };

  return (
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