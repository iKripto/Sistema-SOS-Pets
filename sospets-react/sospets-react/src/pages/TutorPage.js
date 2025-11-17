import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. Importar os ícones de ação
import { Home, Plus, Trash2, Edit2 } from 'react-feather';
// 2. Vamos REAPROVEITAR o CSS da página de Pets para manter o estilo
import './PetPage.css'; //

const TutorPage = () => {
  const [tutores, setTutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados
  const fetchTutores = async () => {
    setLoading(true);
    try {
      // Endpoint do TutorController.java
      const response = await fetch('http://localhost:8080/tutores');
      if (!response.ok) {
        throw new Error('Falha ao buscar dados dos tutores.');
      }
      const data = await response.json();
      setTutores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados quando o componente montar
  useEffect(() => {
    fetchTutores();
  }, []);

  // 3. Função para Deletar
  const handleDelete = async (cpf) => {
    // Fluxo A4 da documentação: Perguntar ao usuário
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/tutores/${cpf}`, {
          method: 'DELETE',
        }); //

        if (!response.ok) {
          throw new Error('Falha ao excluir o tutor.');
        }
        
        // Atualiza a lista local
        setTutores(tutores.filter(tutor => tutor.cpf !== cpf));

      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    // Reutilizando classes de 'PetPage.css'
    <div className="pet-page-container">
      <header className="pet-header">
        <Link to="/" className="back-link">
          <Home size={18} /> Voltar ao Menu
        </Link>
        <h1>Listagem de Tutores</h1>
        {/* 4. Botão Cadastrar (Fluxo A1) */}
        <Link to="/tutores/novo" className="btn-cadastrar">
          <Plus size={16} /> CADASTRAR
        </Link>
      </header>

      {error && <p className="form-error">{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>CPF</th>
              <th>NOME</th>
              <th>RG</th>
              <th>ENDREÇO</th>
              <th>PROFISSÃO</th>
              <th>TELEFONE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {tutores.map((tutor) => (
              <tr key={tutor.cpf}>
                <td>{tutor.cpf}</td>
                <td>{tutor.nome}</td>
                <td>{tutor.rg}</td>
                <td>{tutor.endereco}</td>
                <td>{tutor.profissao}</td>
                <td>{tutor.telefone}</td>
                
                {/* 5. Botões de Ação */}
                <td className="actions-cell">
                  {/* Link para EDITAR (Fluxo A3) */}
                  <Link 
                    to={`/tutores/editar/${tutor.cpf}`} 
                    className="btn-action btn-edit"
                  >
                    <Edit2 size={16} />
                  </Link>
                  
                  {/* Botão para EXCLUIR (Fluxo A4) */}
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(tutor.cpf)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorPage;