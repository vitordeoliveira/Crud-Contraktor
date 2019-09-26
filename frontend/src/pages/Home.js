import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userlogged")) {
      setLogin(true);
    }
    if (localStorage.getItem("contract-invalid-path")) {
      localStorage.removeItem("contract-invalid-path");
    }
  }, []);

  const handleLogout = async e => {
    localStorage.removeItem("userlogged");
    setLogin(false);
  };

  const handleContract = async e => {
    localStorage.setItem("contract-invalid-path", true);
    setLogin(false);
  };

  return (
    <div className="container">
      <h1 className="name">Contraktor</h1>
      <div className="login-cadastro">
        {login ? (
          <Fragment>
            <Link onClick={e => handleLogout(e)} className="btn" to="/">
              LogOut
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link className="btn" to="/login">
              Login
            </Link>
          </Fragment>
        )}

        {login ? (
          <Fragment></Fragment>
        ) : (
          <Fragment>
            <Link className="btn" to="/cadastro">
              Cadastro
            </Link>
          </Fragment>
        )}
      </div>
      <div className="contrato-check">
        {login ? (
          <Fragment>
            <Link className="btn" to="/contrato">
              Contrato
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link onClick={e => handleContract(e)} className="btn" to="/login">
              Contrato
            </Link>
          </Fragment>
        )}

        {login ? (
          <Fragment>
            <Link
              className="btn"
              to={`/youraccount/${localStorage.getItem("userlogged")}`}
            >
              Sua conta
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link className="btn" to="/check">
              Checar CPF
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
