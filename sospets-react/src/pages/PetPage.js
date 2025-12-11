import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Edit2 } from 'react-feather'; 
import './PetPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapa para garantir que Sexo e Espécie apareçam corretamente
  const sexoMap = { 
    0: 'Fêmea', 
    1: 'Macho',
    'FEMEA': 'Fêmea',
    'MACHO': 'Macho',
    'Fêmea': 'Fêmea',
    'Macho': 'Macho'
  };

  const especieMap = { 
    0: 'Cachorro', 
    1: 'Gato',
    'CACHORRO': 'Cachorro',
    'GATO': 'Gato',
    'Cachorro': 'Cachorro',
    'Gato': 'Gato'
  };

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/animais`);
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
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/animais/${id}`, {
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
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>ESPÉCIE</th>
              <th>COR</th>
              <th>FILHOTE</th>
              <th>SEXO</th>
              <th>CASTRADO</th>
              <th>OBSERVAÇÕES</th> {/* COLUNA NOVA */}
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
                
                <td>{especieMap[pet.especie] || pet.especie}</td>
                
                <td>{pet.cor ? pet.cor.descricao : 'N/A'}</td> 
                <td>{pet.eFilhote ? 'Sim' : 'Não'}</td>
                
                <td>{sexoMap[pet.sexo] || pet.sexo}</td>
                
                <td>{pet.castrado ? 'Sim' : 'Não'}</td>

                {/* COLUNA NOVA: Exibe observações com limite de caracteres */}
                <td title={pet.observacoes}>
                    {pet.observacoes ? 
                        (pet.observacoes.length > 30 ? pet.observacoes.substring(0, 30) + '...' : pet.observacoes) 
                        : '-'
                    }
                </td>

                <td>{new Date(pet.dataNascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                <td>{pet.tutor ? pet.tutor.nome : 'Sem tutor'}</td>
                
                <td className="actions-cell">
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