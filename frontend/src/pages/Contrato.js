import React, { useState, Fragment } from "react";
import "./Contrato.css";

import api from "../services/api";

function Contrato({ history, match }) {
  const [formData, setFormData] = useState({
    titulo: "",
    from: "",
    to: "",
    doc: true,
    partes: []
  });

  const [partes, setPartes] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    telefone: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const [newPartes, setNewPartes] = useState([]);

  const [error, setError] = useState({});
  const [toggle, setToggle] = useState(false);
  const [toggleParts, setToggleParts] = useState(false);

  const { titulo, from, to, doc } = formData;
  const { nome, sobrenome, email, cpf, telefone } = partes;

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const id = localStorage.getItem("userlogged");
      setFormData({ titulo, from, to, doc, newPartes });
      const res = await api.post("/contratos", formData, {
        headers: { userlogged: id }
      });

      console.log(res.data);
    } catch (err) {
      setError(err.response.data);
      setToggle(true);
      setTimeout(() => {
        setToggle(false);
        setError("");
      }, 3000);
    }
  }

  async function handlePartes(e) {
    try {
      e.preventDefault();
      setPartes(partes);
      setNewPartes(copia => [...copia, partes]);
      setPartes({ nome: "", sobrenome: "", email: "", cpf: "", telefone: "" });
      setToggleParts(true);
      setTimeout(() => {
        setToggleParts(false);
      }, 2000);
    } catch (err) {}
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangePartes = e => {
    setPartes({ ...partes, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-cadastro">
      <form className="form-cadastro" onSubmit={e => handleSubmit(e)}>
        {toggle && <div className="error-msg">{error.msg}</div>}

        <input
          type="text"
          placeholder="titulo"
          name="titulo"
          value={titulo}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="date"
          placeholder="from"
          name="from"
          value={from}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="date"
          placeholder="to"
          name="to"
          value={to}
          onChange={e => onChange(e)}
        ></input>
        <h1>PARTES</h1>
        <button
          onClick={() => toggleSocialInputs(!displaySocialInputs)}
          type="button"
          className="btn-partes"
        >
          Adicionar Partes
        </button>

        {displaySocialInputs && (
          <Fragment>
            {toggleParts && (
              <div className="toggle-success">adicionado com sucesso</div>
            )}
            <div className="form-partes">
              <input
                type="text"
                placeholder="nome"
                name="nome"
                value={nome}
                onChange={e => onChangePartes(e)}
              ></input>
              <input
                type="text"
                placeholder="sobrenome"
                name="sobrenome"
                value={sobrenome}
                onChange={e => onChangePartes(e)}
              ></input>
              <input
                type="text"
                placeholder="email"
                name="email"
                value={email}
                onChange={e => onChangePartes(e)}
              ></input>
              <input
                type="text"
                placeholder="cpf"
                name="cpf"
                value={cpf}
                onChange={e => onChangePartes(e)}
              ></input>
              <input
                type="text"
                placeholder="telefone"
                name="telefone"
                value={telefone}
                onChange={e => onChangePartes(e)}
              ></input>
              <button onClick={handlePartes} type="submit">
                Confirmar
              </button>
            </div>
          </Fragment>
        )}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contrato;
