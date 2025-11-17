import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. Importar ícones
import { Home, Plus, Trash2, Edit2 } from 'react-feather';
// 2. Reutilizar o CSS de PetPage
import './PetPage.css'; // [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/sospets-react/src/pages/PetPage.css]

const ClinicPage = () => {
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClinicas = async () => {
      setLoading(true);
      try {
        // 3. Buscar dados do endpoint de Clínicas
        const response = await fetch('http://localhost:8080/clinicas'); // [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/controllers/ClinicaController.java]
        if (!response.ok) {
          throw new Error('Falha ao buscar dados das clínicas.');
        }
        const data = await response.json();
        setClinicas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicas();
  }, []);

  // 4. Adicionar função de Delete
  const handleDelete = async (id) => {
    // Fluxo A4 da documentação [cite: Curricularização SOS Pets-1.pdf, page 20]
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/clinicas/${id}`, {
          method: 'DELETE',
        }); // [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/controllers/ClinicaController.java]

        if (!response.ok) {
          throw new Error('Falha ao excluir a clínica.');
        }
        // Atualiza a lista local
        setClinicas(clinicas.filter(clinica => clinica.id !== id));
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
        <h1>Listagem de Clínicas</h1>
        {/* 5. Botão Cadastrar (Fluxo A1) [cite: Curricularização SOS Pets-1.pdf, page 19] */}
        <Link to="/clinicas/novo" className="btn-cadastrar">
          <Plus size={16} /> CADASTRAR
        </Link>
      </header>

      {error && <p className="form-error">{error}</p>}

      <div className="table-container"> {/* Reutilizando CSS */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>ENDEREÇO</th>
              <th>TELEFONE</th>
              <th>DESCONTO (%)</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {clinicas.map((clinica) => (
              <tr key={clinica.id}>
                <td>{String(clinica.id).padStart(3, '0')}</td>
                <td>{clinica.nome}</td>
                {/* NOTA: Seu backend tem um typo em Clinica.java [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/entities/Clinica.java], 
                  está "enderco" em vez de "endereco". O frontend deve usar "enderco".
                */}
                <td>{clinica.enderco}</td>
                <td>{clinica.telefone}</td>
                <td>{clinica.desconto}</td>
                
                {/* 6. Botões de Ação */}
                <td className="actions-cell">
                  {/* Link para EDITAR (Fluxo A3) [cite: Curricularização SOS Pets-1.pdf, page 19] */}
                  <Link 
                    to={`/clinicas/editar/${clinica.id}`} 
                    className="btn-action btn-edit"
                  >
                    <Edit2 size={16} />
                  </Link>
                  
                  {/* Botão para EXCLUIR (Fluxo A4) [cite: Curricularização SOS Pets-1.pdf, page 20] */}
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(clinica.id)}
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

export default ClinicPage;
