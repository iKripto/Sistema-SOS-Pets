import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Edit2 } from 'react-feather';
import './AtendimentoPage.css';

const AtendimentoPage = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAtendimentos = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/atendimentos');
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
        const response = await fetch(`http://localhost:8080/atendimentos/${id}`, {
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
              <th>Tipo</th>
              <th>Data Geração</th>
              <th>Animal</th>
              <th>Tutor</th>
              <th>Servidor</th>
              <th>Clínica / Status</th>
              <th>Data Estimada</th>
              <th>Ações</th>
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
                <td>{a.servidor?.nome || 'N/A'}</td>
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
