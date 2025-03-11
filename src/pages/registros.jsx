import { useState, useEffect } from "react";
import Input from "../components/input";

import axios from "axios";
const API_URL = "http://localhost:3001/montagens";

export default function Registros() {
  const [montagens, setMontagens] = useState([]);
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [concluido, setConcluido] = useState(false);
  const [concluidoFiltro, setConcluidoFiltro] = useState(false);
  const [pendenteFiltro, setPendenteFiltro] = useState(false);
  const [todosFiltro, setTodosFiltro] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [pk, getPK] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((res) => setMontagens(res.data));
  }, []);

  //REQ POST OU PUT NO SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nome, responsavel, concluido };
    const editId = pk;

    //VALIDAÇÃO DE DADOS
    if (data.nome && data.responsavel) {
      if (editIndex) {
        await axios.put(`${API_URL}/${editId}`, data);
        setEditIndex(null);
      } else {
        await axios.post(API_URL, data);
      }
    } else {
      console.log("Erro ao acessar o banco");
    }

    //REQ GET LISTA TODOS
    axios.get(API_URL).then((res) => setMontagens(res.data));
    setNome("");
    setResponsavel("");
    setConcluido(false);
  };

  //FUNÇÃO FILTRA OS DADOS
  async function filterResults(e) {
    e.preventDefault();
    if (concluidoFiltro) {
      await axios
        .get(`${API_URL}/${concluidoFiltro}/concluido`)
        .then((res) => setMontagens(res.data));
      setConcluidoFiltro(false);
    } else if (pendenteFiltro) {
      await axios
        .get(`${API_URL}/${pendenteFiltro}/pendente`)
        .then((res) => setMontagens(res.data));
      setPendenteFiltro(false);
    } else {
      await axios
        .get(`${API_URL}/${todosFiltro}/todos`)
        .then((res) => setMontagens(res.data));
      setTodosFiltro(false);
    }
  }

  //FUNÇÃO RETORNA OS DADOS DO REGISTRO
  const handleEdit = async (element) => {
    setEditIndex(true);
    setNome(element.nome);
    setResponsavel(element.responsavel);
    getPK(element.id);
  };

  //REQ DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setMontagens(montagens.filter((item) => item.id !== id));
  };

  return (
    <div className="w-[full] m-auto min-h-screen mx-auto p-6 bg-slate-500">
      <div className="w-[80%] m-auto min-h-screen mx-auto p-6 bg-white rounded-lg shadow-sm mt-5">
        <h1 className="text-2xl font-bold text-center mb-4">
          Registro de Montagens
        </h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mb-4 space-y-3">
          <Input type="text" onChange={setNome} name="Montagem" value={nome} />
          <Input
            type="text"
            onChange={setResponsavel}
            name="Responsável"
            value={responsavel}
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={concluido}
              onChange={(e) => setConcluido(e.target.checked)}
              className="w-5 h-5"
            />
            <span>Concluído</span>
          </label>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            {editIndex !== null ? "Atualizar Montagem" : "Adicionar Montagem"}
          </button>
        </form>

        <hr className="border-black/50 my-2" />

        {/*FORMULARIO FILTRO*/}
        <form onSubmit={filterResults} className="flex flex-col gap-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="opcao"
              onChange={(event) => {
                setConcluidoFiltro(event.target.checked);
              }}
              className="w-5 h-5"
            />
            <span>Concluído</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="opcao"
              onChange={(event) => {
                setPendenteFiltro(event.target.checked);
              }}
              className="w-5 h-5"
            />
            <span>Pendente</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="opcao"
              onChange={(event) => {
                setTodosFiltro(event.target.checked);
              }}
              className="w-5 h-5"
            />
            <span>Todos</span>
          </label>

          {/* <Input type="text" onChange={""} name="Responsável" value={""} /> */}

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Filtrar Montagem
          </button>
        </form>

        {/* Tabela de Montagens */}
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-slate-200">
              <th className="border p-2">Montagem</th>
              <th className="border p-2">Responsável</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {montagens.map((montagem, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{montagem.nome}</td>
                <td className="border p-2">{montagem.responsavel}</td>
                <td className="border p-2">
                  {montagem.concluido ? "✅ Concluído" : "❌ Pendente"}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-yellow-400 text-white p-1 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(montagem)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    onClick={() => {
                      handleDelete(montagem.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
