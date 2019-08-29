import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Moment from "react-moment";
import "./YourAccont.css";

const YourAccount = ({ match }) => {
  const id = localStorage.getItem("userlogged");
  const [contracts, setContracts] = useState({
    mycontrats: [],
    otherContrats: []
  });

  useEffect(() => {
    async function loadContracts() {
      const res = await api.get("/contratos", {
        headers: { userlogged: match.params.id }
      });
      setContracts(res.data);
    }
    loadContracts();
  }, [match.params.id]);

  return (
    <div className="container-account">
      <Link to={`/contratos/${id}`}>CONTRATOS</Link>
      <h1>Seus Contratos</h1>
      <div className="contratos">
        <ul>
          {contracts.mycontrats.map(contract => (
            <li key={contract._id}>
              <strong className="account-titulo">{contract.titulo}</strong>
              <p>
                From:<Moment format="DD/MM/YYYY">{contract.from}</Moment>
              </p>
              <p>
                To:<Moment format="DD/MM/YYYY">{contract.to}</Moment>
              </p>
              <p>PARTES:</p>
              {contract.partes.map(parte => (
                <div className="perfils">
                  <p>{parte.nome}</p>
                  <button>Perfil</button>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <h1>Contratos em que voce faz parte</h1>
      <div className="contratos">
        <ul>
          {contracts.otherContrats.map(contract => (
            <li key={contract._id}>
              <strong className="account-titulo">{contract.titulo}</strong>
              <p>
                From:<Moment format="DD/MM/YYYY">{contract.from}</Moment>
              </p>
              <p>
                To:<Moment format="DD/MM/YYYY">{contract.to}</Moment>
              </p>
              <p>PARTES:</p>
              {contract.partes.map(parte => (
                <div className="perfils">
                  <p>{parte.nome}</p>
                  <button>Perfil</button>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YourAccount;
