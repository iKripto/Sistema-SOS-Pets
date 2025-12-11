// Arquivo: sospets-react/src/pages/RelatoriosPage.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Home, Download } from "react-feather";
import "./RelatoriosPage.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const RelatoriosPage = () => {
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

      let url = `${API_BASE_URL}/${tipo}`;
      const params = [];
      if (dataInicio) params.push(`inicio=${dataInicio}`);
      if (dataFim) params.push(`fim=${dataFim}`);
      if (params.length) url += `?${params.join("&")}`;

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

  const filtrarBusca = (item) => {
    if (!busca) return true;
    const termo = busca.toLowerCase();

    switch (tipo) {
      case "animais":
        return (
          item.nome?.toLowerCase().includes(termo) ||
          item.tutor?.nome?.toLowerCase().includes(termo) ||
          item.raca?.toLowerCase().includes(termo) ||
          (item.castrado ? "sim" : "não").includes(termo)
        );
      case "tutores":
        return item.nome?.toLowerCase().includes(termo);
      case "clinicas":
        return item.nome?.toLowerCase().includes(termo);
      case "funcionarios":
        return item.nome?.toLowerCase().includes(termo);
      case "atendimentos":
        return (
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

  const exportarPDF = () => {
    const doc = new jsPDF();
    const dadosFiltrados = dados.filter(filtrarBusca);

    let colunas = [];
    let linhas = [];

    if (tipo === "animais") {
      colunas = ["Nome", "Espécie", "Raça", "Castrado", "Tutor"];
      linhas = dadosFiltrados.map(item => [
        item.nome,
        item.especie,
        item.raca,
        item.castrado ? "Sim" : "Não",
        item.tutor?.nome || 'Sem tutor'
      ]);
    } else if (tipo === "tutores") {
      colunas = ["Nome", "CPF", "Telefone"];
      linhas = dadosFiltrados.map(item => [item.nome, item.cpf, item.telefone]);
    } else if (tipo === "clinicas") {
      colunas = ["Nome", "Endereço", "Telefone"];
      linhas = dadosFiltrados.map(item => [item.nome, item.endereco || item.enderco, item.telefone]);
    } else if (tipo === "funcionarios") {
      colunas = ["Nome", "CPF", "Profissão"];
      linhas = dadosFiltrados.map(item => [item.nome, item.cpf, item.profissao]);
    } else if (tipo === "atendimentos") {
      colunas = ["Data", "Animal", "Tutor", "Voluntário", "Clínica", "Tipo", "Histórico"];
      linhas = dadosFiltrados.map(item => [
        item.dataGeracao ? new Date(item.dataGeracao).toLocaleDateString('pt-BR') : '-',
        item.animal?.nome || 'N/A',
        item.tutor?.nome || 'N/A',
        item.funcionario?.nome || 'N/A',
        item.clinica?.nome || item.statusClinica || '-',
        item.tipo,
        item.historico
      ]);
    }

    const tituloMap = {
      atendimentos: "Atendimentos",
      animais: "Animais",
      tutores: "Tutores",
      clinicas: "Clínicas",
      funcionarios: "Voluntários"
    };

    doc.text(`Relatório de ${tituloMap[tipo]}`, 14, 15);
    autoTable(doc, { head: [colunas], body: linhas, startY: 20 });
    doc.save(`relatorio_${tipo}.pdf`);
  };

  return (
    <div className="relatorios-container">
      <header className="relatorios-header">
        <Link to="/" className="back-link">
          <Home size={18} /> Voltar ao Menu
        </Link>
        <h1>Relatórios</h1>
        <button onClick={exportarPDF} className="btn-baixar"><Download size={18}/> BAIXAR PDF</button>
      </header>

      {/* FILTROS */}
      <div className="relatorios-filtros">
        <div className="filtro">
          <label>Tipo de relatório:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="atendimentos">Atendimentos</option>
            <option value="animais">Animais</option>
            <option value="tutores">Tutores</option>
            <option value="clinicas">Clínicas</option>
            <option value="funcionarios">Voluntários</option>
          </select>
        </div>

        <div className="filtro">
          <label>Data início:</label>
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        </div>

        <div className="filtro">
          <label>Data fim:</label>
          <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>

        <div className="filtro">
          <label>Busca:</label>
          <input
            type="text"
            placeholder="Buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <button onClick={carregarDados} className="btn-filtrar">ATUALIZAR</button>
      </div>

      {erro && <div className="form-error">{erro}</div>}
      {loading && <p>Carregando...</p>}

      {!loading && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {tipo === "animais" && <><th>NOME</th><th>ESPÉCIE</th><th>RAÇA</th><th>CASTRADO</th><th>TUTOR</th></>}
                {tipo === "tutores" && <><th>NOME</th><th>CPF</th><th>TELEFONE</th></>}
                {tipo === "clinicas" && <><th>NOME</th><th>ENDEREÇO</th><th>TELEFONE</th></>}
                {tipo === "funcionarios" && <><th>NOME</th><th>CPF</th><th>PROFISSÃO</th></>}
                {tipo === "atendimentos" && <><th>DATA</th><th>ANIMAL</th><th>TUTOR</th><th>VOLUNTÁRIO</th><th>CLÍNICA</th><th>TIPO</th><th>DESCRIÇÃO</th></>}
              </tr>
            </thead>
            <tbody>
              {dados.filter(filtrarBusca).map((item, index) => (
                <tr key={item.id || item.cpf || index}>
                  {tipo === "animais" && <><td>{item.nome}</td><td>{item.especie}</td><td>{item.raca}</td><td>{item.castrado ? "Sim" : "Não"}</td><td>{item.tutor?.nome || 'Sem tutor'}</td></>}
                  {tipo === "tutores" && <><td>{item.nome}</td><td>{item.cpf}</td><td>{item.telefone}</td></>}
                  {tipo === "clinicas" && <><td>{item.nome}</td><td>{item.endereco || item.enderco}</td><td>{item.telefone}</td></>}
                  {tipo === "funcionarios" && <><td>{item.nome}</td><td>{item.cpf}</td><td>{item.profissao}</td></>}
                  {tipo === "atendimentos" && <><td>{item.dataGeracao ? new Date(item.dataGeracao).toLocaleDateString('pt-BR') : '-'}</td><td>{item.animal?.nome || 'N/A'}</td><td>{item.tutor?.nome || 'N/A'}</td><td>{item.funcionario?.nome || 'N/A'}</td><td>{item.clinica?.nome || item.statusClinica || '-'}</td><td>{item.tipo}</td><td>{item.historico}</td></>}
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
