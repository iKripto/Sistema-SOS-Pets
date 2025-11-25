import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RelatoriosPage.css";

// Usa a variável de ambiente definida no .env (padrão do React) ou localhost como fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const RelatoriosPage = () => {
  // CORREÇÃO 1: Valor inicial ajustado para um endpoint válido
  const [tipo, setTipo] = useState("atendimentos");
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setErro(null);

      // CORREÇÃO 2: A URL usa o 'tipo', então os valores do <select> devem bater com os Controllers Java
      let url = `${API_BASE_URL}/${tipo}`;

      // Tratamento de filtros de data (preparado para futuro uso no backend)
      const params = [];
      if (dataInicio) params.push(`inicio=${dataInicio}`);
      if (dataFim) params.push(`fim=${dataFim}`);
      if (params.length) url += `?${params.join("&")}`;

      console.log("Buscando em:", url); // Debug para verificar a URL no console

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erro ${res.status}: Falha ao buscar dados de ${tipo}`);

      const json = await res.json();
      setDados(json);
    } catch (error) {
      console.error("Erro:", error);
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
    // eslint-disable-next-line
  }, [tipo]);

  // 🔍 Filtragem local (nome, tipo, tutor etc.)
  const filtrarBusca = (item) => {
    if (!busca) return true;
    const termo = busca.toLowerCase();

    switch (tipo) {
      case "animais": // Endpoint Java: /animais
        return (
          item.nome?.toLowerCase().includes(termo) ||
          item.tutor?.nome?.toLowerCase().includes(termo)
        );
      case "tutores": // Endpoint Java: /tutores
        return item.nome?.toLowerCase().includes(termo);
      case "clinicas": // Endpoint Java: /clinicas
        return item.nome?.toLowerCase().includes(termo);
      case "funcionarios": // Endpoint Java: /funcionarios
        return item.nome?.toLowerCase().includes(termo);
      case "atendimentos": // Endpoint Java: /atendimentos
        return (
          // CORREÇÃO 3: Ajuste para os nomes que vêm do Java (animal, funcionario, tipo)
          item.animal?.nome?.toLowerCase().includes(termo) ||
          item.tutor?.nome?.toLowerCase().includes(termo) ||
          item.funcionario?.nome?.toLowerCase().includes(termo) || // Era 'colaborador'
          item.clinica?.nome?.toLowerCase().includes(termo) ||
          item.tipo?.toLowerCase().includes(termo) // Era 'tipoAtendimento'
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
          {/* CORREÇÃO 4: Values atualizados para bater com as URLs dos Controllers */}
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="atendimentos">Atendimentos</option>
            <option value="animais">Animais</option>       {/* Antes: pets */}
            <option value="tutores">Tutores</option>
            <option value="clinicas">Clínicas</option>
            <option value="funcionarios">Colaboradores</option> {/* Antes: colaboradores */}
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
              {dados.filter(filtrarBusca).map((item, index) => (
                <tr key={item.id || item.cpf || index}>
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
                      <td>{item.endereco || item.enderco}</td> {/* Tratamento para possível erro de digitação no backend */}
                      <td>{item.telefone}</td>
                    </>
                  )}
                  {tipo === "funcionarios" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.cpf}</td>
                      {/* CORREÇÃO 5: Campo correto é profissao */}
                      <td>{item.profissao}</td>
                    </>
                  )}
                  {tipo === "atendimentos" && (
                    <>
                      {/* CORREÇÃO 6: Mapeamento correto dos campos de Atendimento */}
                      <td>{item.dataGeracao ? new Date(item.dataGeracao).toLocaleDateString('pt-BR') : '-'}</td>
                      <td>{item.animal?.nome || 'N/A'}</td>
                      <td>{item.tutor?.nome || 'N/A'}</td>
                      <td>{item.funcionario?.nome || 'N/A'}</td>
                      <td>{item.clinica?.nome || item.statusClinica || '-'}</td>
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