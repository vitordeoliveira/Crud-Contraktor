import React, { useState } from "react";
import "./Cadastro.css";

import api from "../services/api";

function Cadastro({ history }) {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: ""
  });
  const [error, setError] = useState({});
  const [toggle, setToggle] = useState(false);

  const { nome, sobrenome, email, cpf, telefone, senha } = formData;

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const { data } = await api.post("/cadastro", formData);
      console.log(data);
      await history.push(`/youraccount/${data._id}`);
    } catch (err) {
      setError(err.response.data);
      setToggle(true);
      setTimeout(() => {
        setToggle(false);
        setError("");
      }, 3000);
    }
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-cadastro">
      <form className="form-cadastro" onSubmit={e => handleSubmit(e)}>
        {toggle && <div className="error-msg">{error.msg}</div>}

        <input
          type="text"
          placeholder="Nome"
          name="nome"
          value={nome}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="text"
          placeholder="sobrenome"
          name="sobrenome"
          value={sobrenome}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="text"
          placeholder="cpf"
          name="cpf"
          value={cpf}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="text"
          placeholder="telefone"
          name="telefone"
          value={telefone}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="password"
          placeholder="Senha"
          name="senha"
          value={senha}
          onChange={e => onChange(e)}
        ></input>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Cadastro;
