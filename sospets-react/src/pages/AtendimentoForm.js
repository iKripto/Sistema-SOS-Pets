import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Home } from 'react-feather';
import './AtendimentoForm.css';

// Configuração da URL da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';


const AtendimentoForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipo: 'castracao',
    dataGeracao: '',
    animalId: '',
    tutorCpf: '',
    servidorCpf: '',
    clinicaId: '',
    statusClinica: 'aguardando',
    dataEstimada: '',
    historico: ''
  });

  const [animais, setAnimais] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [servidores, setServidores] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Buscar dados auxiliares (animais, tutores, colaboradores, clinicas)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animaisRes, tutoresRes, servidoresRes, clinicasRes] = await Promise.all([
          fetch(`${API_BASE_URL}/animais`),
          fetch(`${API_BASE_URL}/tutores`),
          fetch(`${API_BASE_URL}/funcionarios`),
          fetch(`${API_BASE_URL}/clinicas`)
        ]);

        setAnimais(await animaisRes.json());
        setTutores(await tutoresRes.json());
        setServidores(await servidoresRes.json());
        setClinicas(await clinicasRes.json());

        if (isEditing) {
          const atRes = await fetch(`${API_BASE_URL}/atendimentos/${id}`);
          if (!atRes.ok) throw new Error('Atendimento não encontrado.');
          const data = await atRes.json();
          setFormData({
            tipo: data.tipo,
            dataGeracao: data.dataGeracao,
            animalId: String(data.animal.id),
            tutorCpf: data.tutor?.cpf || '',
            servidorCpf: data.voluntario?.cpf || '',
            clinicaId: data.clinica ? String(data.clinica.id) : '',
            statusClinica: data.statusClinica || 'aguardando',
            dataEstimada: data.dataEstimada || '',
            historico: data.historico || ''
          });
        }
      } catch (err) {
        setError('Erro ao carregar dados: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      tipo: formData.tipo,
      dataGeracao: formData.dataGeracao,
      animal: { id: parseInt(formData.animalId) },
      tutor: formData.tutorCpf ? { cpf: formData.tutorCpf } : null,
      
      // --- CORREÇÃO AQUI ---
      // Mudamos de 'servidor' para 'funcionario' para bater com a Entidade Java
      voluntario: { cpf: formData.servidorCpf }, 
      
      clinica: formData.clinicaId ? { id: parseInt(formData.clinicaId) } : null,
      statusClinica: formData.statusClinica,
      dataEstimada: formData.dataEstimada || null,
      historico: formData.historico
    };
    

    const url = isEditing
      ? `${API_BASE_URL}/atendimentos/${id}`
      : `${API_BASE_URL}/atendimentos`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Falha ao salvar o atendimento.');
      navigate('/atendimentos');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="pet-form-container">
      <header className="pet-header">
        <Link to="/atendimentos" className="back-link">
          <Home size={18} /> Voltar para Atendimentos
        </Link>
        <h1>{isEditing ? 'Editar Atendimento' : 'Cadastrar Novo Atendimento'}</h1>
      </header>

      {error && <p className="form-error">{error}</p>}

      <form className="pet-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Atendimento</label>
          <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="castracao">Castração</option>
            <option value="tratamento">Tratamento Médico</option>
            <option value="adocao">Adoção</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dataGeracao">Data de Geração</label>
          <input type="date" id="dataGeracao" name="dataGeracao" value={formData.dataGeracao} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="animalId">Animal</label>
          <select id="animalId" name="animalId" value={formData.animalId} onChange={handleChange} required>
            <option value="">Selecione um animal</option>
            {animais.map(a => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tutorCpf">Tutor</label>
          <select id="tutorCpf" name="tutorCpf" value={formData.tutorCpf} onChange={handleChange}>
            <option value="">Sem tutor (acolhido pela ONG)</option>
            {tutores.map(t => (
              <option key={t.cpf} value={t.cpf}>{t.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="servidorCpf">Voluntário Responsável</label>
          <select id="servidorCpf" name="servidorCpf" value={formData.servidorCpf} onChange={handleChange} required>
            <option value="">Selecione o servidor</option>
            {servidores.map(s => (
              <option key={s.cpf} value={s.cpf}>{s.nome}</option>
            ))}
          </select>
        </div>

        {(formData.tipo === 'castracao' || formData.tipo === 'tratamento') && (
          <>
            <div className="form-group">
              <label htmlFor="clinicaId">Clínica</label>
              <select id="clinicaId" name="clinicaId" value={formData.clinicaId} onChange={handleChange}>
                <option value="">Aguardando clínica</option>
                {clinicas.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dataEstimada">Data Estimada</label>
              <input type="date" id="dataEstimada" name="dataEstimada" value={formData.dataEstimada} onChange={handleChange} />
            </div>
          </>
        )}

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="historico">Histórico e Observações</label>
          <textarea id="historico" name="historico" rows="5" value={formData.historico} onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="btn-salvar" style={{ gridColumn: '2 / 3' }}>
          {isEditing ? 'Atualizar Atendimento' : 'Salvar Atendimento'}
        </button>
      </form>
    </div>
  );
};

export default AtendimentoForm;
