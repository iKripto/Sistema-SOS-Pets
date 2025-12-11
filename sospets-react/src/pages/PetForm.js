import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Home } from 'react-feather';
import './PetForm.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const PetForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    raca: '',
    porte: '0',
    dataNascimento: '',
    eFilhote: false,
    especie: '0',
    sexo: '0',
    statusAcolhimento: true,
    castrado: false,
    observacoes: '',
    cor: '',
    tutorCpf: ''
  });

  const [cores, setCores] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [coresRes, tutoresRes] = await Promise.all([
          fetch(`${API_BASE_URL}/cor`),
          fetch(`${API_BASE_URL}/tutores`)
        ]);

        const coresData = await coresRes.json();
        const tutoresData = await tutoresRes.json();

        setCores(coresData);
        setTutores(tutoresData);

        if (isEditing) {
          const animalRes = await fetch(`${API_BASE_URL}/animais/${id}`);
          if (!animalRes.ok) throw new Error('Animal não encontrado.');
          const animal = await animalRes.json();

          setFormData({
            nome: animal.nome,
            raca: animal.raca || '',
            porte: String(animal.porte),
            dataNascimento: new Date(animal.dataNascimento).toISOString().split('T')[0],
            eFilhote: animal.eFilhote,
            especie: String(animal.especie),
            sexo: String(animal.sexo),
            statusAcolhimento: animal.statusAcolhimento,
            castrado: animal.castrado || false,
            observacoes: animal.observacoes || '',
            cor: animal.cor?.descricao || '',
            tutorCpf: animal.tutor ? animal.tutor.cpf : ''
          });
        }
      } catch (err) {
        setError('Falha ao carregar dados: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const animalData = {
      nome: formData.nome,
      raca: formData.raca,
      porte: parseInt(formData.porte, 10),
      dataNascimento: formData.dataNascimento,
      eFilhote: formData.eFilhote,
      especie: parseInt(formData.especie, 10),
      sexo: isNaN(parseInt(formData.sexo, 10)) ? formData.sexo : parseInt(formData.sexo, 10),
      statusAcolhimento: formData.statusAcolhimento,
      castrado: formData.castrado,
      observacoes: formData.observacoes,
      cor: { descricao: formData.cor },
      tutor: formData.tutorCpf ? { cpf: formData.tutorCpf } : null
    };

    if (isEditing) animalData.id = parseInt(id, 10);

    const url = isEditing ? `${API_BASE_URL}/animais/${id}` : `${API_BASE_URL}/animais`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData)
      });

      if (!response.ok) {
        const erroMsg = await response.text();
        throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'cadastrar'}: ${erroMsg}`);
      }

      navigate('/pets');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="pet-form-container">
      <header className="pet-header">
        <Link to="/pets" className="back-link">
          <Home size={18} /> Voltar para Pets
        </Link>
        <h1>{isEditing ? 'Editar Animal' : 'Cadastrar Novo Animal'}</h1>
      </header>

      {error && <p className="form-error">{error}</p>}

      <form className="pet-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input id="nome" name="nome" type="text" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="raca">Raça</label>
          <input id="raca" name="raca" type="text" value={formData.raca} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input id="dataNascimento" name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="especie">Espécie</label>
          <select id="especie" name="especie" value={formData.especie} onChange={handleChange}>
            <option value="0">Cachorro</option>
            <option value="1">Gato</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sexo">Sexo</label>
          <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange}>
            <option value="0">Fêmea</option>
            <option value="1">Macho</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="porte">Porte</label>
          <select id="porte" name="porte" value={formData.porte} onChange={handleChange}>
            <option value="0">Pequeno</option>
            <option value="1">Médio</option>
            <option value="2">Grande</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="corId">Cor</label>
          <select id="corId" name="corId" value={formData.corId} onChange={handleChange} required>
            <option value="">Selecione uma cor</option>
            {cores.map(cor => (
              <option key={cor.id} value={cor.id}>{cor.descricao}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tutorCpf">Tutor (Opcional)</label>
          <select id="tutorCpf" name="tutorCpf" value={formData.tutorCpf} onChange={handleChange}>
            <option value="">Sem tutor (acolhido pela ONG)</option>
            {tutores.map(tutor => (
              <option key={tutor.cpf} value={tutor.cpf}>{tutor.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group full-width" style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="observacoes">Observações</label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows="3"
            placeholder="Informações adicionais sobre o pet (alergias, comportamento, etc)"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
          />
        </div>

        <div className="form-group-checkbox">
          <label htmlFor="eFilhote">
            <input id="eFilhote" name="eFilhote" type="checkbox" checked={formData.eFilhote} onChange={handleChange} />
            É filhote?
          </label>

          <label htmlFor="statusAcolhimento">
            <input id="statusAcolhimento" name="statusAcolhimento" type="checkbox" checked={formData.statusAcolhimento} onChange={handleChange} />
            Status Acolhimento Ativo?
          </label>

          <label htmlFor="castrado">
            <input id="castrado" name="castrado" type="checkbox" checked={formData.castrado} onChange={handleChange} />
            Castrado?
          </label>
        </div>

        <button type="submit" className="btn-salvar">
          {isEditing ? 'Atualizar Animal' : 'Salvar Animal'}
        </button>
      </form>
    </div>
  );
};

export default PetForm;
