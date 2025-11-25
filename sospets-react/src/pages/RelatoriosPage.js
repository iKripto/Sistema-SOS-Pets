import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RelatoriosPage.css";

// URL base da API
const API_BASE_URL = 'http://localhost:8080';

const RelatoriosPage = () => {
  // CORREÇÃO 1: Os valores iniciais agora correspondem aos endpoints da API
  const [tipo, setTipo] = useState("atendimentos"); 
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Buscar dados conforme tipo e filtros
  const carregarDados = async () => {
    try {
      setLoading(true);
      setErro(null);
      
      // A URL é construída diretamente com o 'tipo', que agora bate com o Backend
      let url = `${API_BASE_URL}/${tipo}`;

      // Nota: O backend atual não implementa filtro de data nativamente no findAll, 
      // então esses parâmetros podem ser ignorados pelo servidor, mas mantemos aqui para futura implementação.
      const params = [];
      if (dataInicio) params.push(`inicio=${dataInicio}`);
      if (dataFim) params.push(`fim=${dataFim}`);
      if (params.length) url += `?${params.join("&")}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao carregar dados. Verifique se o servidor está rodando.");

      const json = await res.json();
      setDados(json);
    } catch (error) {
      console.error("Erro:", error);
      setErro("Falha ao carregar dados: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
    // eslint-disable-next-line
  }, [tipo]); // Recarrega sempre que o tipo mudar

  // 🔍 Filtragem local (nome, tipo, tutor etc.)
  const filtrarBusca = (item) => {
    if (!busca) return true;
    const termo = busca.toLowerCase();
    
    switch (tipo) {
      case "animais": // Antes era "pets"
        return (
          item.nome?.toLowerCase().includes(termo) ||
          item.tutor?.nome?.toLowerCase().includes(termo)
        );
      case "tutores":
        return item.nome?.toLowerCase().includes(termo);
      case "clinicas":
        return item.nome?.toLowerCase().includes(termo);
      case "funcionarios": // Antes era "colaboradores"
        return item.nome?.toLowerCase().includes(termo);
      case "atendimentos":
        return (
          // CORREÇÃO 2: Ajuste dos nomes das propriedades para bater com o Java
          item.animal?.nome?.toLowerCase().includes(termo) ||
          item.tutor?.nome?.toLowerCase().includes(termo) ||
          item.funcionario?.nome?.toLowerCase().includes(termo) ||
          item.clinica?.nome?.toLowerCase().includes(termo) ||
          item.tipo?.toLowerCase().includes(termo)
        );
      default:
        return true;
    }
  };

  return (
    <div className="relatorios-container">
      <div className="relatorios-header">
        <h1>Relatórios</h1>
        <Link to="/" className="back-link">
          ← Voltar
        </Link>
      </div>

      <div className="relatorios-filtros">
        <div className="filtro">
          <label>Tipo de relatório:</label>
          {/* CORREÇÃO 3: Values atualizados para os endpoints corretos */}
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="atendimentos">Atendimentos</option>
            <option value="animais">Animais</option> {/* Endpoint /animais */}
            <option value="tutores">Tutores</option> {/* Endpoint /tutores */}
            <option value="clinicas">Clínicas</option> {/* Endpoint /clinicas */}
            <option value="funcionarios">Colaboradores</option> {/* Endpoint /funcionarios */}
          </select>
        </div>

        <div className="filtro">
          <label>Data início:</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>

        <div className="filtro">
          <label>Data fim:</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <div className="filtro">
          <label>Busca:</label>
          <input
            type="text"
            placeholder="Buscar por nome, tutor, tipo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <button onClick={carregarDados} className="btn-filtrar">
          Atualizar
        </button>
      </div>

      {erro && <div className="form-error">{erro}</div>}
      {loading && <p>Carregando...</p>}

      {/* --- TABELA --- */}
      {!loading && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {tipo === "animais" && (
                  <>
                    <th>Nome</th>
                    <th>Espécie</th>
                    <th>Raça</th>
                    <th>Tutor</th>
                  </>
                )}
                {tipo === "tutores" && (
                  <>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                  </>
                )}
                {tipo === "clinicas" && (
                  <>
                    <th>Nome</th>
                    <th>Endereço</th>
                    <th>Telefone</th>
                  </>
                )}
                {tipo === "funcionarios" && (
                  <>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Profissão</th> {/* Ajustado label */}
                  </>
                )}
                {tipo === "atendimentos" && (
                  <>
                    <th>Data</th>
                    <th>Animal</th>
                    <th>Tutor</th>
                    <th>Colaborador</th>
                    <th>Clínica</th>
                    <th>Tipo</th>
                    <th>Histórico</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {dados.filter(filtrarBusca).map((item) => (
                <tr key={item.id || item.cpf}>
                  {tipo === "animais" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.especie}</td>
                      <td>{item.raca}</td>
                      <td>{item.tutor?.nome || 'Sem tutor'}</td>
                    </>
                  )}
                  {tipo === "tutores" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.cpf}</td>
                      <td>{item.telefone}</td>
                    </>
                  )}
                  {tipo === "clinicas" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.endereco || item.enderco}</td> {/* Backend tem typo 'enderco' na entidade Clinica */}
                      <td>{item.telefone}</td>
                    </>
                  )}
                  {tipo === "funcionarios" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.cpf}</td>
                      {/* CORREÇÃO 4: Campo correto é profissao */}
                      <td>{item.profissao}</td> 
                    </>
                  )}
                  {tipo === "atendimentos" && (
                    <>
                      {/* CORREÇÃO 5: Campos corretos do Atendimento */}
                      <td>{item.dataGeracao ? new Date(item.dataGeracao).toLocaleDateString('pt-BR') : '-'}</td>
                      <td>{item.animal?.nome || 'N/A'}</td>
                      <td>{item.tutor?.nome || 'N/A'}</td>
                      <td>{item.funcionario?.nome || 'N/A'}</td>
                      <td>{item.clinica?.nome || item.statusClinica}</td>
                      <td>{item.tipo}</td>
                      <td>{item.historico}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RelatoriosPage;