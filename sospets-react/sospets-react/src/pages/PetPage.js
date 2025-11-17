import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Edit2 } from 'react-feather'; 
import './PetPage.css'; // [cite: ikripto/fullstacksospets/FullStackSosPets-86c84f912a08c7b71c676a96f956bfb3739f275d/sospets-react/src/pages/PetPage.css]

const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sexoMap = { 0: 'Fêmea', 1: 'Macho' };
  const especieMap = { 0: 'Cachorro', 1: 'Gato' };

  useEffect(() => {
    const fetchPets = async () => {
      // ... (código de fetchPets inalterado) ...
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/animais');
        if (!response.ok) {
          throw new Error('Falha ao buscar dados dos pets.');
        }
        const data = await response.json();
        setPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    // ... (código de handleDelete inalterado) ...
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/animais/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Falha ao excluir o animal.');
        }
        setPets(pets.filter(pet => pet.id !== id));
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
        <h1>Listagem de Pets</h1>
        <Link to="/pets/novo" className="btn-cadastrar">
          <Plus size={16} /> CADASTRAR
        </Link>
      </header>

      {error && <p className="form-error">{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            {/* ... (cabeçalho da tabela inalterado) ... */}
            <tr>
              <th>CÓDIGO</th>
              <th>NOME</th>
              <th>ESPÉCIE</th>
              <th>COR</th>
              <th>FILHOTE</th>
              <th>SEXO</th>
              <th>DATA DE NASCIMENTO</th>
              <th>TUTOR</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td>PET-{String(pet.id).padStart(3, '0')}</td>
                <td>{pet.nome}</td>
                <td>{especieMap[pet.especie]}</td>
                <td>{pet.cor ? pet.cor.descricao : 'N/A'}</td> 
                <td>{pet.eFilhote ? 'Sim' : 'Não'}</td>
                <td>{sexoMap[pet.sexo]}</td>
                <td>{new Date(pet.dataNascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                <td>{pet.tutor ? pet.tutor.nome : 'Sem tutor'}</td>
                
                <td className="actions-cell">
                  {/* BOTÃO EDITAR AGORA É UM LINK */}
                  <Link 
                    to={`/pets/editar/${pet.id}`} 
                    className="btn-action btn-edit"
                  >
                    <Edit2 size={16} />
                  </Link>
                  
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(pet.id)}
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

export default PetPage;
