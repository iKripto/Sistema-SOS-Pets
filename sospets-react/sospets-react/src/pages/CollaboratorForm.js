import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Home } from 'react-feather';
// Reutilizando o CSS do formulário de Pets
import './PetForm.css'; // [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/sospets-react/src/pages/PetForm.css]

const CollaboratorForm = () => {
  const { cpf } = useParams(); // O ID do colaborador é o CPF
  const isEditing = Boolean(cpf);

  // Campos do formulário baseados em Funcionario.java [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/entities/Funcionario.java]
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    rg: '',
    email: '',
    profissao: '',
    endereco: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Se estiver editando, busca os dados
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      const fetchCollaborator = async () => {
        try {
          const response = await fetch(`http://localhost:8080/funcionarios/${cpf}`);
          if (!response.ok) {
            throw new Error('Colaborador não encontrado.');
          }
          const data = await response.json();
          setFormData(data);
        } catch (err) {
          setError('Falha ao carregar dados do colaborador: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCollaborator();
    }
  }, [cpf, isEditing]);

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
      ? `http://localhost:8080/funcionarios/${cpf}` // PUT [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/controllers/FuncionarioController.java]
      : 'http://localhost:8080/funcionarios';      // POST [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/controllers/FuncionarioController.java]
      
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // O objeto já está no formato correto
      });

      if (!response.ok) {
        throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'cadastrar'} o colaborador.`);
      }

      navigate('/colaboradores'); // Sucesso, voltar para a lista

    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="pet-form-container">
      <header className="pet-header">
        <Link to="/colaboradores" className="back-link">
          <Home size={18} /> Voltar para Colaboradores
        </Link>
        <h1>{isEditing ? 'Editar Colaborador' : 'Cadastrar Novo Colaborador'}</h1>
      </header>

      {error && <p className="form-error">{error}</p>}

      <form className="pet-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          {/* Desabilita o campo CPF ao editar (Chave Primária) */}
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
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="profissao">Profissão</label>
          <input id="profissao" name="profissao" type="text" value={formData.profissao || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input id="endereco" name="endereco" type="text" value={formData.endereco || ''} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-salvar" style={{gridColumn: '2 / 3'}}>
          {isEditing ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default CollaboratorForm;
