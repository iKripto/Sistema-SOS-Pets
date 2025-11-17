import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RelatoriosPage.css";

const RelatoriosPage = () => {
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
      let url = `http://localhost:8080/${tipo}`;

      const params = [];
      if (dataInicio) params.push(`inicio=${dataInicio}`);
      if (dataFim) params.push(`fim=${dataFim}`);
      if (params.length) url += `?${params.join("&")}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao carregar dados");

      const json = await res.json();
      setDados(json);
    } catch (error) {
      console.error("Erro:", error);
      setErro("Falha ao carregar dados");
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
    const termo = busca.toLowerCase();
    switch (tipo) {
      case "pets":
        return (
          item.nome?.toLowerCase().includes(termo) ||
          item.tutor?.nome?.toLowerCase().includes(termo)
        );
      case "tutores":
        return item.nome?.toLowerCase().includes(termo);
      case "clinicas":
        return item.nome?.toLowerCase().includes(termo);
      case "colaboradores":
        return item.nome?.toLowerCase().includes(termo);
      case "atendimentos":
        return (
          item.pet?.nome?.toLowerCase().includes(termo) ||
          item.tutor?.nome?.toLowerCase().includes(termo) ||
          item.colaborador?.nome?.toLowerCase().includes(termo) ||
          item.clinica?.nome?.toLowerCase().includes(termo) ||
          item.tipoAtendimento?.toLowerCase().includes(termo)
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
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="pets">Animais</option>
            <option value="tutores">Tutores</option>
            <option value="clinicas">Clínicas</option>
            <option value="colaboradores">Colaboradores</option>
            <option value="atendimentos">Atendimentos</option>
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
          Gerar
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
                {tipo === "pets" && (
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
                    <th>Cidade</th>
                  </>
                )}
                {tipo === "colaboradores" && (
                  <>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Cargo</th>
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
                  {tipo === "pets" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.especie}</td>
                      <td>{item.raca}</td>
                      <td>{item.tutor?.nome}</td>
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
                      <td>{item.endereco}</td>
                      <td>{item.cidade}</td>
                    </>
                  )}
                  {tipo === "colaboradores" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.cpf}</td>
                      <td>{item.cargo}</td>
                    </>
                  )}
                  {tipo === "atendimentos" && (
                    <>
                      <td>{item.data}</td>
                      <td>{item.pet?.nome}</td>
                      <td>{item.tutor?.nome}</td>
                      <td>{item.colaborador?.nome}</td>
                      <td>{item.clinica?.nome}</td>
                      <td>{item.tipoAtendimento}</td>
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
