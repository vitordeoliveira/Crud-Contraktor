import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Contrato.css";
import api from "../services/api";

function Contrato({ history }) {
  const [file, setFile] = useState({});

  const [formData, setFormData] = useState({
    titulo: "",
    from: "",
    to: "",
    doc: "",
    partes: []
  });

  const [partes, setPartes] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    telefone: ""
  });

  const [newPartes, setNewPartes] = useState([]);

  useEffect(() => {
    setFormData({ titulo, from, to, partes: newPartes });
    // eslint-disable-next-line
  }, [newPartes]);

  useEffect(() => {
    setFormData({ titulo, from, to, doc: file, partes: newPartes });
    // eslint-disable-next-line
  }, [file]);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [error, setError] = useState({});
  const [toggle, setToggle] = useState(false);
  const [toggleParts, setToggleParts] = useState(false);
  const [togglePartsContract, setTogglePartsContract] = useState(false);
  const { titulo, from, to } = formData;
  const { nome, sobrenome, email, cpf, telefone } = partes;

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const id = localStorage.getItem("userlogged");
      const res = await api.post("/contratos", formData, {
        headers: { userlogged: id }
      });
      console.log(res.data);
      history.push(`/youraccount/${id}`);
    } catch (err) {
      setError(err.response.data);
      setToggle(true);
      setTimeout(() => {
        setToggle(false);
        setError("");
      }, 3000);
    }
  }

  async function handleContract(e) {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append("file", file);
    try {
      const res = await api.post("/upload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { data } = res;
      setFile(data.data);

      setTogglePartsContract(true);
      setTimeout(() => {
        setTogglePartsContract(false);
      }, 2000);
    } catch (err) {
      setError(err.response.data);
      setTogglePartsContract(true);
      setTimeout(() => {
        setTogglePartsContract(false);
        setError("");
      }, 3000);
    }
  }

  async function handlePartes(e) {
    try {
      e.preventDefault();
      setPartes(partes);
      if (
        partes.nome ||
        partes.sobrenome ||
        partes.cpf ||
        partes.email ||
        partes.telefone
      ) {
        setNewPartes(copia => [...copia, partes]);
        setPartes({
          nome: "",
          sobrenome: "",
          email: "",
          cpf: "",
          telefone: ""
        });
        setToggleParts(true);
        setTimeout(() => {
          setToggleParts(false);
        }, 2000);
      } else {
        setError({ msg: "Preencha todos os dados" });
        setToggleParts(true);
        setTimeout(() => {
          setToggleParts(false);
          setError("");
        }, 3000);
      }
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

  const onChangePartes = e => {
    setPartes({ ...partes, [e.target.name]: e.target.value });
  };

  const onChangeContract = e => {
    setFile(e.target.files[0]);
  };

  return (
    <div id="#1" className="container-cadastro">
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
          {displaySocialInputs ? (
            <Fragment>Parar de adicionar</Fragment>
          ) : (
            <Fragment>Adicionar Partes</Fragment>
          )}
        </button>

        {displaySocialInputs && (
          <Fragment>
            {toggleParts && (
              <Fragment>
                {error.msg ? (
                  <div className="error-msg">{error.msg}</div>
                ) : (
                  <div className="toggle-success">Adicionado com sucesso</div>
                )}
              </Fragment>
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
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={e => onChangePartes(e)}
              ></input>
              <input
                type="number"
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

        {/* Adicionar o Documento */}
        {togglePartsContract && (
          <Fragment>
            {error.msg ? (
              <div className="error-msg">{error.msg}</div>
            ) : (
              <div className="toggle-success">Adicionado com sucesso</div>
            )}
          </Fragment>
        )}
        <div>
          <div>
            <input
              type="file"
              id="customFile"
              onChange={e => onChangeContract(e)}
            ></input>
            <label htmlFor="customFile"></label>
          </div>

          <input
            type="submit"
            value="Upload"
            onClick={e => handleContract(e)}
          ></input>
        </div>

        <Link to="/files/myfiles.txt" target="_blank" download>
          DOW
        </Link>

        {/* FINISH */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contrato;
