const express = require("express");
const UserController = require("./controllers/UserController");
const ContractController = require("./controllers/ContractController");

const routes = express.Router();

routes.get("/usuarios", UserController.index);
routes.post("/usuarios", UserController.login);

routes.get("/usuarios/:cpf", UserController.indexOne);
routes.post("/cadastro", UserController.store);

routes.get("/contratos", ContractController.index);
routes.post("/contratos", ContractController.store);
routes.get("/contratos/:id", ContractController.indexOne);
routes.delete("/contratos/:id", ContractController.delete);
routes.post("/upload", ContractController.upload);
routes.get("/download/:filename", ContractController.download);

module.exports = routes;
