import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div className="container">
      <h1 className="name">Contraktor</h1>
      <div className="login-cadastro">
        <Link className="btn" to="/login">
          Login
        </Link>

        <Link className="btn" to="/cadastro">
          Cadastro
        </Link>
      </div>
      <div className="contrato-check">
        <Link className="btn" to="/contrato">
          Contrato
        </Link>

        <Link className="btn" to="/check">
          Checar CPF
        </Link>
      </div>
    </div>
  );
};

export default Home;
