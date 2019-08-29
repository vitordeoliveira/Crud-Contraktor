import React, { useState } from "react";
import "./Login.css";
import api from "../services/api";

function Login({ history }) {
  const [formData, setFormData] = useState({
    email: "",
    cpf: "",
    senha: ""
  });

  const [toggle, setToggle] = useState(false);

  const [error, setError] = useState({});

  const { email, cpf, senha } = formData;

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const { data } = await api.post("/usuarios", formData);
      localStorage.removeItem("userlogged");
      localStorage.setItem("userlogged", data._id);
      history.push(`/youraccount/${data._id}`);
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
    <div className="container-login">
      <form className="form-login" onSubmit={e => handleSubmit(e)}>
        {toggle && <div className="error-msg">{error.msg}</div>}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          value={cpf}
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

export default Login;
