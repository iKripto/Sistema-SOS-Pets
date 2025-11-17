import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Home } from 'react-feather';
// Vamos REAPROVEITAR o CSS do formulário de Pets
import './PetForm.css'; // [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/sospets-react/src/pages/PetForm.css]

const ClinicForm = () => {
  const { id } = useParams(); // Pega o ID da URL
  const isEditing = Boolean(id);

  // Campos do formulário baseados em Clinica.java [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/entities/Clinica.java]
  const [formData, setFormData] = useState({
    nome: '',
    enderco: '', // <-- ATENÇÃO: Typo vindo do backend (Clinica.java)
    telefone: '',
    desconto: 0
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Se estiver editando, busca os dados da clínica
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      const fetchClinic = async () => {
        try {
          const response = await fetch(`http://localhost:8080/clinicas/${id}`);
          if (!response.ok) {
            throw new Error('Clínica não encontrada.');
          }
          const data = await response.json();
          setFormData(data);
        } catch (err) {
          setError('Falha ao carregar dados da clínica: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchClinic();
    }
  }, [id, isEditing]); // Executa se o ID na URL mudar

  // Atualiza o estado do formulário
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  // Envia os dados (POST ou PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Prepara o payload
    const payload = {
      ...formData,
      desconto: parseFloat(formData.desconto)
    };

    const url = isEditing 
      ? `http://localhost:8080/clinicas/${id}` // PUT para editar [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/controllers/ClinicaController.java]
      : 'http://localhost:8080/clinicas';      // POST para criar [cite: ikripto/fullstacksospets/FullStackSosPets-0fc15d1f65c4ace1f0be6beed39894125100c702/backend/src/main/java/com/example/sospets/controllers/ClinicaController.java]
      
    const method = isEditing ? 'PUT' : 'POST';

    // Adiciona o ID no corpo se for PUT
    if (isEditing) {
      payload.id = parseInt(id, 10);
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'cadastrar'} a clínica.`);
      }

      navigate('/clinicas'); // Sucesso, voltar para a lista

    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="pet-form-container">
      <header className="pet-header">
        <Link to="/clinicas" className="back-link">
          <Home size={18} /> Voltar para Clínicas
        </Link>
        <h1>{isEditing ? 'Editar Clínica' : 'Cadastrar Nova Clínica'}</h1>
      </header>

      {error && <p className="form-error">{error}</p>}

      <form className="pet-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome da Clínica</label>
          <input id="nome" name="nome" type="text" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input id="telefone" name="telefone" type="text" value={formData.telefone || ''} onChange={handleChange} />
        </div>

        <div className="form-group" style={{gridColumn: '1 / -1'}}>
          <label htmlFor="enderco">Endereço</label>
          {/* Note que o 'name' é "enderco" para bater com o typo do backend */}
          <input id="enderco" name="enderco" type="text" value={formData.enderco || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="desconto">Desconto (%)</label>
          <input id="desconto" name="desconto" type="number" step="0.01" value={formData.desconto} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-salvar" style={{gridColumn: '2 / 3'}}>
          {isEditing ? 'Atualizar Clínica' : 'Salvar Clínica'}
        </button>
      </form>
    </div>
  );
};

export default ClinicForm;
