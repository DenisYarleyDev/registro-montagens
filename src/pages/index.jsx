import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useState } from "react";
import Modal from "../components/modal";

export default function Index() {
  const navigate = useNavigate();

  //state get user and password in login page
  const [user, getUser] = useState("");
  const [password, getPassword] = useState("");

  //state error modal
  const [showModal, setShowModal] = useState(false);

  const loginParams = ["denis", "1234"];

  return (
    <div className="w-screen min-h-screen bg-slate-200 flex items-center justify-center">
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <div className="bg-white m-10 flex flex-col w-[400px] gap-5 justify-center p-8 shadow-md rounded-md">
        <h1 className="text-2xl">Login Registro de Montagens</h1>
        <Input onChange={getUser} name="Usuário" type="text" value={user} />
        <Input
          onChange={getPassword}
          name="Senha"
          type="password"
          value={password}
        />
        <p className="text-sm">
          Não possui um conta?{" "}
          <span className="text-green-500 cursor-pointer">
            cadastre-se aqui
          </span>
        </p>
        <button
          onClick={() => {
            if (user == loginParams[0] && password == loginParams[1]) {
              console.log("logado com sucesso!");
              navigate("/registros");
            } else {
              setShowModal(true);
              console.log("usuario ou senha incorretos");
              getUser("");
              getPassword("");
            }
          }}
          className="bg-green-500 shadow-md rounded-md p-2 text-slate-100 w-full cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
