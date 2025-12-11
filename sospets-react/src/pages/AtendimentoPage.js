import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Edit2 } from 'react-feather';
import './AtendimentoPage.css';

// Recomendo usar a mesma constante de URL que usamos no Form para facilitar mudanças futuras
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const AtendimentoPage = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAtendimentos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/atendimentos`);
        if (!response.ok) throw new Error('Falha ao buscar dados dos atendimentos.');
        const data = await response.json();
        setAtendimentos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAtendimentos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este atendimento?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/atendimentos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Falha ao excluir o atendimento.');
        setAtendimentos(atendimentos.filter(a => a.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="pet-page-container">
      <header className="pet-header">
        <Link to="/" className="back-link">
          <Home size={18} /> Voltar ao Menu
        </Link>
        <h1>Listagem de Atendimentos</h1>
        <Link to="/atendimentos/novo" className="btn-cadastrar">
          <Plus size={16} /> CADASTRAR
        </Link>
      </header>

      {error && <p className="form-error">{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>TIPO</th>
              <th>DATA GERAÇÃO</th>
              <th>ANIMAL</th>
              <th>TUTOR</th>
              <th>VOLUNTÁRIO</th>
              <th>CLÍNICA/STATUS</th>
              <th>DATA ESTIMADA</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((a) => (
              <tr key={a.id}>
                <td>{String(a.id).padStart(3, '0')}</td>
                <td>{a.tipo}</td>
                <td>{new Date(a.dataGeracao).toLocaleDateString('pt-BR')}</td>
                <td>{a.animal?.nome || 'N/A'}</td>
                <td>{a.tutor?.nome || 'Sem tutor'}</td>
                
                {/* --- CORREÇÃO AQUI --- */}
                {/* Alterado de a.servidor?.nome para a.funcionario?.nome */}
                <td>{a.funcionario?.nome || 'N/A'}</td>

                <td>{a.clinica ? a.clinica.nome : a.statusClinica || '—'}</td>
                <td>{a.dataEstimada ? new Date(a.dataEstimada).toLocaleDateString('pt-BR') : '—'}</td>

                <td className="actions-cell">
                  <Link to={`/atendimentos/editar/${a.id}`} className="btn-action btn-edit">
                    <Edit2 size={16} />
                  </Link>
                  <button className="btn-action btn-delete" onClick={() => handleDelete(a.id)}>
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

export default AtendimentoPage;