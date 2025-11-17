import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Home } from 'react-feather';
// Vamos REAPROVEITAR o CSS do formulário de Pets
import './PetForm.css'; //

const TutorForm = () => {
  // O ID do tutor é o CPF, conforme TutorController.java
  const { cpf } = useParams();
  const isEditing = Boolean(cpf);

  // Campos do formulário baseados em Tutor.java
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    rg: '',
    endereco: '',
    profissao: '',
    telefone: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Se estiver editando, busca os dados do tutor
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      const fetchTutor = async () => {
        try {
          const response = await fetch(`http://localhost:8080/tutores/${cpf}`);
          if (!response.ok) {
            throw new Error('Tutor não encontrado.');
          }
          const data = await response.json();
          setFormData(data);
        } catch (err) {
          setError('Falha ao carregar dados do tutor: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchTutor();
    }
  }, [cpf, isEditing]); // Executa se o CPF na URL mudar

  // Atualiza o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Envia os dados (POST ou PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = isEditing 
      ? `http://localhost:8080/tutores/${cpf}` // PUT para editar
      : 'http://localhost:8080/tutores';      // POST para criar
      
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'cadastrar'} o tutor.`);
      }

      navigate('/tutores'); // Sucesso, voltar para a lista

    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    // Reutilizando classes de 'PetForm.css'
    <div className="pet-form-container">
      <header className="pet-header">
        <Link to="/tutores" className="back-link">
          <Home size={18} /> Voltar para Tutores
        </Link>
        <h1>{isEditing ? 'Editar Tutor' : 'Cadastrar Novo Tutor'}</h1>
      </header>

      {error && <p className="form-error">{error}</p>}

      {/* Reutilizando a classe 'pet-form' */}
      <form className="pet-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          {/* Desabilita o campo CPF ao editar, pois é a Chave Primária */}
          <input id="cpf" name="cpf" type="text" value={formData.cpf} onChange={handleChange} required disabled={isEditing} />
        </div>

        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input id="nome" name="nome" type="text" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="rg">RG</label>
          <input id="rg" name="rg" type="text" value={formData.rg || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input id="telefone" name="telefone" type="text" value={formData.telefone || ''} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label htmlFor="profissao">Profissão</label>
          <input id="profissao" name="profissao" type="text" value={formData.profissao || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input id="endereco" name="endereco" type="text" value={formData.endereco || ''} onChange={handleChange} />
        </div>

        {/* Botão de salvar alinhado à direita no grid */}
        <button type="submit" className="btn-salvar" style={{gridColumn: '2 / 3'}}>
          {isEditing ? 'Atualizar Tutor' : 'Salvar Tutor'}
        </button>
      </form>
    </div>
  );
};

export default TutorForm;