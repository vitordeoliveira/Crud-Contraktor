const Contract = require("../models/Contract");
const User = require("../models/User");
const validarCpf = require("validar-cpf");

module.exports = {
  async index(req, res) {
    const { userlogged } = req.headers;
    const { cpf } = await User.findById(userlogged);
    const contracts = { mycontrats: [], otherContrats: [] };
    //Contratos do usuario
    const myContracts = await Contract.find({ user: userlogged });
    myContracts.forEach(contract => {
      contracts.mycontrats.unshift(contract);
    });
    //Outros contratos
    const othersContract = await Contract.find({ user: { $ne: userlogged } });
    othersContract.map(contratos => {
      let { partes } = contratos;
      partes.map(parte => {
        if (parte.cpf === cpf) {
          contracts.otherContrats.unshift(contratos);
        }
      });
    });

    return res.json(contracts);
  },

  async store(req, res) {
    try {
      const { userlogged } = req.headers;
      if (!userlogged) {
        return res.status(400).json({ msg: "Precisa estar logado" });
      }

      const { titulo, from, to, doc, partes } = await req.body;
      const contract = {
        user: userlogged,
        titulo,
        from,
        to,
        doc,
        partes
      };

      if (!titulo || !from || !to || !doc) {
        return res
          .status(400)
          .json({ msg: `Alguma parte obrigatoria esta faltando` });
      }

      //Checar validade todos os CPFs
      partes.forEach(usuario => {
        let { cpf } = usuario;
        let corrections = cpf.trim();
        let check = validarCpf(corrections);
        if (!check) {
          return res.status(400).json({ msg: `CPF:${corrections} invalido` });
        }
      });

      //Checar CPFs repetidos
      for (let x = 0; x < partes.length - 1; x++) {
        for (let y = x + 1; y < partes.length; y++) {
          if (partes[x].cpf === partes[y].cpf) {
            return res
              .status(400)
              .json({ msg: `CPF:${partes[x].cpf} repetido` });
          }
        }
      }

      // Criando contrato no DB
      const contractSaved = await Contract.create(contract);

      //Map das partes
      partes.map(async usuario => {
        let { cpf } = usuario;
        let corrections = cpf.trim();
        //Checar se a parte j? existe no sistema
        let partUser = await User.findOne({ cpf: corrections });
        if (partUser) {
          //Cadastrar em contratos na sua conta
          await partUser.contratos.unshift(contractSaved._id);
          await partUser.save();
        }
      });

      return res.json(contractSaved);
    } catch (err) {
      res.json(err.message);
    }
  },

  async indexOne(req, res) {
    try {
      const { loggeduser } = req.headers;
      const idContract = req.params.id;
      const contract = await Contract.findById(idContract);
      const { cpf } = await User.findById(loggeduser);
      contract.partes.map(parte => {
        if (contract.user === loggeduser || parte.cpf === cpf) {
          return res.json(contract);
        }
        return res.status(401).json({ msg: "nao autorizado" });
      });
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
