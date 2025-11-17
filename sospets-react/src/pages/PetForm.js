// 1. Importar 'useParams' para ler o ID da URL
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Home } from 'react-feather';
import './PetForm.css'; // [cite: ikripto/fullstacksospets/FullStackSosPets-86c84f912a08c7b71c676a96f956bfb3739f275d/sospets-react/src/pages/PetForm.css]

const PetForm = () => {
  // 2. Obter o 'id' da URL. Será 'undefined' se for a rota /pets/novo
  const { id } = useParams();
  const isEditing = Boolean(id); // True se 'id' existir

  // 3. Unificar o estado do formulário em um objeto
  const [formData, setFormData] = useState({
    nome: '',
    raca: '',
    porte: '0',
    dataNascimento: '',
    eFilhote: false,
    especie: '0',
    sexo: '0',
    statusAcolhimento: true,
    corId: '',
    tutorCpf: ''
  });

  // Estados de controle
  const [cores, setCores] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Inicia true para carregar dados
  
  const navigate = useNavigate();

  // 4. useEffect modificado para buscar dados
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Sempre buscar Cores e Tutores
        const [coresRes, tutoresRes] = await Promise.all([
          fetch('http://localhost:8080/cor'),
          fetch('http://localhost:8080/tutores')
        ]);
        
        const coresData = await coresRes.json();
        const tutoresData = await tutoresRes.json();
        
        setCores(coresData);
        setTutores(tutoresData);

        // Se estiver editando (isEditing === true), buscar dados do animal
        if (isEditing) {
          const animalRes = await fetch(`http://localhost:8080/animais/${id}`);
          if (!animalRes.ok) throw new Error('Animal não encontrado.');
          
          const animal = await animalRes.json();
          
          // Preenche o formulário com os dados do animal
          setFormData({
            nome: animal.nome,
            raca: animal.raca || '',
            porte: String(animal.porte),
            // Formata a data para YYYY-MM-DD
            dataNascimento: new Date(animal.dataNascimento).toISOString().split('T')[0],
            eFilhote: animal.eFilhote,
            especie: String(animal.especie),
            sexo: String(animal.sexo),
            statusAcolhimento: animal.statusAcolhimento,
            corId: String(animal.cor.id),
            tutorCpf: animal.tutor ? animal.tutor.cpf : ''
          });
        }
      } catch (err) {
        setError('Falha ao carregar dados: ' + err.message);
      } finally {
        setLoading(false); // Terminou de carregar
      }
    };
    fetchData();
  }, [id, isEditing]); // Depende do 'id' da URL

  // 5. Função única para lidar com todas as mudanças
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 6. handleSubmit modificado para fazer POST (Criar) ou PUT (Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Monta o objeto para a API
    const animalData = {
      nome: formData.nome,
      raca: formData.raca,
      porte: parseInt(formData.porte, 10),
      dataNascimento: formData.dataNascimento,
      eFilhote: formData.eFilhote,
      especie: parseInt(formData.especie, 10),
      sexo: parseInt(formData.sexo, 10),
      statusAcolhimento: formData.statusAcolhimento,
      cor: { id: parseInt(formData.corId, 10) },
      tutor: formData.tutorCpf ? { cpf: formData.tutorCpf } : null
    };
    
    // Define a URL e o Método corretos
    const url = isEditing 
      ? `http://localhost:8080/animais/${id}` // [cite: ikripto/fullstacksospets/FullStackSosPets-86c84f912a08c7b71c676a96f956bfb3739f275d/backend/src/main/java/com/example/sospets/controllers/AnimalController.java]
      : 'http://localhost:8080/animais';
      
    const method = isEditing ? 'PUT' : 'POST';

    // Adiciona o ID no corpo se for PUT
    if (isEditing) {
      animalData.id = parseInt(id, 10);
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData),
      });

      if (!response.ok) {
        const erroMsg = await response.text();
        throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'cadastrar'}: ${erroMsg}`);
      }

      navigate('/pets'); // Sucesso, voltar para a lista

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
        {/* 7. Título dinâmico */}
        <h1>{isEditing ? 'Editar Animal' : 'Cadastrar Novo Animal'}</h1>
      </header>

      {error && <p className="form-error">{error}</p>}

      {/* 8. Formulário atualizado para usar o 'formData' e 'handleChange' */}
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

        <div className="form-group-checkbox">
          <label htmlFor="eFilhote">
            <input id="eFilhote" name="eFilhote" type="checkbox" checked={formData.eFilhote} onChange={handleChange} />
            É filhote?
          </label>
          
          <label htmlFor="statusAcolhimento">
            <input id="statusAcolhimento" name="statusAcolhimento" type="checkbox" checked={formData.statusAcolhimento} onChange={handleChange} />
            Status Acolhimento Ativo?
          </label>
        </div>

        {/* 9. Botão dinâmico */}
        <button type="submit" className="btn-salvar">
          {isEditing ? 'Atualizar Animal' : 'Salvar Animal'}
        </button>
      </form>
    </div>
  );
};

export default PetForm;
