import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Edit2 } from 'react-feather';
// Vamos reutilizar o CSS do PetPage para manter a consistência
import './PetPage.css'; // [cite: ikripto/fullstacksospets/FullStackSosPets-377f8109a3631bb635d066f623b4f36508380df4/sospets-react/src/pages/PetPage.css]

const CollaboratorPage = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColaboradores = async () => {
      setLoading(true);
      try {
        // Busca dados do endpoint de Funcionários (Colaboradores)
        const response = await fetch('http://localhost:8080/funcionarios'); // [cite: ikripto/fullstacksospets/FullStackSosPets-377f8109a3631bb635d066f623b4f36508380df4/backend/src/main/java/com/example/sospets/controllers/FuncionarioController.java]
        if (!response.ok) {
          throw new Error('Falha ao buscar dados dos colaboradores.');
        }
        const data = await response.json();
        setColaboradores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchColaboradores();
  }, []);

  // Função para Deletar
  const handleDelete = async (cpf) => {
    // Fluxo A4 da documentação [cite: Curricularização SOS Pets-1.pdf, page 17]
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/funcionarios/${cpf}`, {
          method: 'DELETE',
        }); // [cite: ikripto/fullstacksospets/FullStackSosPets-377f8109a3631bb635d066f623b4f36508380df4/backend/src/main/java/com/example/sospets/controllers/FuncionarioController.java]

        if (!response.ok) {
          throw new Error('Falha ao excluir o colaborador.');
        }
        // Atualiza a lista local
        setColaboradores(colaboradores.filter(c => c.cpf !== cpf));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="pet-page-container"> {/* Reutilizando CSS */}
      <header className="pet-header"> {/* Reutilizando CSS */}
        <Link to="/" className="back-link">
          <Home size={18} /> Voltar ao Menu
        </Link>
        <h1>Listagem de Colaboradores</h1>
        {/* Botão Cadastrar (Fluxo A1) [cite: Curricularização SOS Pets-1.pdf, page 16] */}
        <Link to="/colaboradores/novo" className="btn-cadastrar">
          <Plus size={16} /> CADASTRAR
        </Link>
      </header>

      {error && <p className="form-error">{error}</p>}

      <div className="table-container"> {/* Reutilizando CSS */}
        <table>
          <thead>
            <tr>
              <th>CPF</th>
              <th>NOME</th>
              <th>RG</th>
              <th>EMAIL</th>
              <th>PROFISSÃO</th>
              <th>ENDEREÇO</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {colaboradores.map((colaborador) => (
              <tr key={colaborador.cpf}>
                <td>{colaborador.cpf}</td>
                <td>{colaborador.nome}</td>
                <td>{colaborador.rg}</td>
                <td>{colaborador.email}</td>
                <td>{colaborador.profissao}</td>
                <td>{colaborador.endereco}</td>
                
                <td className="actions-cell">
                  {/* Link para EDITAR (Fluxo A3) [cite: Curricularização SOS Pets-1.pdf, page 16] */}
                  <Link 
                    to={`/colaboradores/editar/${colaborador.cpf}`} 
                    className="btn-action btn-edit"
                  >
                    <Edit2 size={16} />
                  </Link>
                  
                  {/* Botão para EXCLUIR (Fluxo A4) [cite: Curricularização SOS Pets-1.pdf, page 17] */}
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(colaborador.cpf)}
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

export default CollaboratorPage;

