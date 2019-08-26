const Contract = require("../models/Contract");
const User = require("../models/User");
const validarCpf = require("validar-cpf");

module.exports = {
  async index(req, res) {
    const { userlogged } = req.headers;
    const contracts = { mycontrats: [], otherContrats: [] };
    const myContracts = await Contract.find({ user: userlogged });
    const othersContract = await Contract.find({ user: { $ne: userlogged } });
    contracts.mycontrats.push(myContracts);
    othersContract.forEach(part => {
      if (part.partes.includes(userlogged)) {
        contracts.otherContrats.push(part);
      }
    });

    return res.json(contracts);
  },

  async store(req, res) {
    try {
      const { userlogged } = req.headers;
      const { titulo, from, to, doc, partes } = await req.body;
      //Map das partes
      const parts = partes.split(";").map(parte => parte.trim());

      //Capturando o ID dos cpfs & Verificar validade dos cpfs
      //--@--Checar cfps repetidos
      const ids = [];
      const wait = [];
      for (let index = 0; index < parts.length; index++) {
        let validation = validarCpf(parts[index]);

        if (validation) {
          let partUser = await User.findOne({ cpf: parts[index] });

          if (partUser) {
            ids.push(partUser._id);
          } else {
            wait.push(parts[index]);
          }
        } else {
          console.log(`CPF ${parts[index]} inválido`);
        }
      }

      const contract = await Contract.create({
        user: userlogged,
        titulo,
        from,
        to,
        doc,
        partes: ids,
        waiting: wait
      });

      return res.json(contract);
    } catch (err) {
      res.json(err.message);
    }
  },

  async indexOne(req, res) {
    try {
      const idContract = req.params.id;
      const contract = await Contract.findById(idContract);

      res.json(contract);
    } catch (err) {
      res.status(404).json({ msg: "Contract not found " });
    }
  },

  async delete(req, res) {
    try {
      const idContract = req.params.id;
      const { userlogged } = req.headers;
      const contract = await Contract.findById(idContract);
      //Check contract ID exist
      if (!contract) {
        return res.status(404).json({ msg: "Contract not found " });
      }
      //Check user can delete or not
      if (userlogged == contract.user) {
        const contractDeleted = await Contract.findByIdAndDelete(idContract);
        return res.json(contractDeleted);
      } else {
        return res.status(401).json("You dont have permission to do that");
      }
    } catch (err) {
      res.status(404).json({ msg: "Contract not found! " });
    }
  }
};
