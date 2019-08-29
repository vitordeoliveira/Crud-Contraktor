import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import YourAccount from "./pages/YourAccount";
import Contrato from "./pages/Contrato";

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/cadastro" component={Cadastro}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/youraccount/:id" component={YourAccount}></Route>
        <Route path="/Contrato" component={Contrato}></Route>
      </Switch>
    </BrowserRouter>
  );
}
